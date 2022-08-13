const userModel = require('../models/user.js');
const otpService = require(`../services/otp.js`);
const hashPassword = require(`../services/hash_password.js`);
const user = require('../models/user.js');
const token = require(`../services/jwt_handler.js`);
const emailService = require(`../services/mail_service.js`);

module.exports.signUpUser = async (req, res) => {
    // Taking User's data
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    let errors = [];

    // CHecking if user entered any null data
    if (userName == undefined || userName == "") {
        errors.push('Please provide a user name.');
    }

    if (userEmail == undefined || userEmail == "") {
        errors.push('Please provide an email.');
    } else {
        const isEmailValid = checkEmailValidity(userEmail);
        if (!isEmailValid) {
            errors.push('Please provide a valid email.');
        }
    }

    if (userPassword == undefined || userPassword == "") {
        errors.push('Please enter a password.')
    }

    if (errors.length > 0) {
        throw errors;
    } else {

        // Checking If Provided email already exist in DB 
        const emailData = await userModel.findOne({ email: userEmail });
        if (emailData != null) {
            throw ('This Email already exist.');
        }

        // Checking If Provided Name already exist in DB 
        const nameData = await userModel.findOne({ name: userName });
        if (nameData != null) {
            throw ('this name already exits');
        }

        const hashedPassword = await hashPassword.hashPasswordGenerator(userPassword);
        const generatedOTP = otpService.otpGenerator();

        // Storing All data into database
        const userData = await userModel.create({
            name: userName,
            email: userEmail,
            password: hashedPassword,
            otp: generatedOTP
        });

        // Send otp to email
        const sendOtp = emailService.sendOtpMail(userData.email, userData.otp);

        const newData = {
            name: userData.name,
            email: userData.email,
            // password: userData.password,
            isVerified: userData.isVerified
        }

        res.json({
            "status": "Success",
            "message": "Registration Complete",
            "data": newData
        });
    }
}


module.exports.verifyEmail = async (req, res) => {
    // Taking User's Email and OTP
    const email = req.body.email;
    const OTP = req.body.otp;

    let errors = [];

    // Checking if any null data is present or not
    if (email == undefined || email == "") {
        errors.push('Please Provide your email.');
    } else {
        const isEmailValid = checkEmailValidity(email);
        if (!isEmailValid) {
            errors.push('Please provide a valid email.');
        }
    }

    if (OTP == undefined || OTP == "") {
        errors.push('Please Enter your OTP.');
    }
    if (errors.length > 0) {
        throw errors;
    } else {
        // Check if Email matched with Database
        const emailData = await userModel.findOne({ email: email });

        if (emailData == null) {
            throw 'Your Email is not Registered.';
        }
        if (emailData.isVerified == true) {
            throw "Your email is already verified."
        }
        else {
            // Checking if provided OTP match with OTP in DB
            if (OTP != emailData.otp) {
                throw 'your otp is not match.';
            } else {
                await userModel.findByIdAndUpdate(emailData._id, {
                    isVerified: true
                });
            }

            res.json({
                "status": "Success",
                "message": "Verification Complete.",
                "data": null
            })
        }
    }

}

//====>>>> Sign In <<<<====//
module.exports.signIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let errors = [];

    // Checking IF Entered data is null or not
    if (email == undefined || email == "") {
        errors.push('Please provide a email.');
    } else {
        const isEmailValid = checkEmailValidity(email);
        if (!isEmailValid) {
            errors.push('Please provide a valid email.');
        }
    }

    if (password == undefined || password == "") {
        errors.push('Please Enter your password.');
    }

    if (errors.length > 0) {
        throw errors;
    } else {

        const emailData = await userModel.findOne({ email: email });

        if (emailData == null) {
            throw "This Email is not Registered.";
        }

        if (emailData.isVerified != true) {
            throw "This Email is not verified";
        } else {
            const isCorrectPassword = await hashPassword.comparePassword(password, emailData.password);
            if ( isCorrectPassword == false) {
                throw "Your password is wrong.";
            } else {

                const accessToken = token.createNewAccessToken(emailData.email);
                const refreshToken = token.createNewRefreshToken(emailData.email);

                res.json({
                    "status": "Success",
                    "message": "Log in successfull.",
                    "data": {
                        "access-token": accessToken,
                        "refresh-token": refreshToken
                    }
                });
            }
        }
    }
}

// Checking Email
const checkEmailValidity = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValid = re.test(String(email).toLowerCase());
    return isEmailValid;
}

// ACCESS TOKEN GENERATOR
module.exports.accessTokenGenerator = async (req, res) => {

    const userEmail = req.body.email;
    const newAccessToken = await token.createNewAccessToken(userEmail);
    
    res.json({
        "status": "Success",
        "message": "Successfully generated Access token",
        "data": {
            "accessToken": newAccessToken
        }
    })
}