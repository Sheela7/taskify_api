// Importing all the required modules.
const userModel = require('../models/user.js');
const otpService = require(`../services/otp.js`);
const hashPassword = require(`../services/hash_password.js`);
const token = require(`../services/jwt_handler.js`);
// const emailService = require(`../services/mail_service.js`);

// Register a new user.
module.exports.signUpUser = async (req, res) => {
    // Taking User's Inputs
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userGender = req.body.gender;

    const errors = validateSignUpData(userName, userEmail, userPassword, userGender);

    if (errors.length > 0) {
        throw errors;
    } else {

        // Checks if this email exists.
        const emailData = await userModel.findOne({ email: userEmail });
        if (emailData != null) throw ('This Email already exist.');

        // Check if the user name already exits.
        const nameData = await userModel.findOne({ name: userName });
        if (nameData != null) throw ('this name already exits');

        // Generates a hashed password and OTP for the given user password.
        const hashedPassword = await hashPassword.hashPasswordGenerator(userPassword);
        const generatedOTP = otpService.otpGenerator();

        // Creates a new user in database.
        const userData = await userModel.create({
            name: userName,
            email: userEmail,
            password: hashedPassword,
            gender: userGender,
            otp: generatedOTP
        });

        // Send otp to email
        // const sendOtp = emailService.sendOtpMail(userData.email, userData.otp);

        res.json({
            "status": "Success",
            "message": "Registration Complete",
            "data": {
                name: userData.name,
                email: userData.email,
                gender: userData.gender,
                isVerified: userData.isVerified
            }
        });
    }
}

// Verify A User.
module.exports.verifyEmail = async (req, res) => {

    // Taking User's Email and OTP
    const email = req.body.email;
    const OTP = req.body.otp;

    const errors = validateVerificationData(email, OTP);

    if (errors.length > 0) {
        throw errors;
    } else {
        // Check if Email matched with Database
        const emailData = await userModel.findOne({ email: email });

        if (emailData == null) throw 'Your Email is not Registered.';
        
        if (emailData.isVerified == true) {
            throw "Your email is already verified.";
        }
        else {
            // Checks if the OTP matches the OTP in Database.
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
            });
        }
    }

}

// Sign in a User and Give them Access token.
module.exports.signIn = async (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    const errors = checkSignInData(email, password);

    if (errors.length > 0) {
        throw errors;
    } else {

        const emailData = await userModel.findOne({ email: email });

        // Checks if this Email is registered.
        if (emailData == null) throw "This Email is not Registered.";

        //Check if this Email is verified.
        if (emailData.isVerified != true) {
            throw "This Email is not verified";
        } else {
            
            // Compares the password with the hashed password of the database.
            const isCorrectPassword = await hashPassword.comparePassword(password, emailData.password);
            
            if (isCorrectPassword == false) {
                throw "Your password is wrong.";
            } else {

                // Creates a new access token and refresh token.
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

// Generate a new access token for a user.
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

// Checks if an email is valid.
const checkEmailValidity = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValid = re.test(String(email).toLowerCase());
    return isEmailValid;
}

// Validates the sign up data and returns an array of errors if there is.
const validateSignUpData = ( userName, userEmail, userPassword, userGender ) => {
    
    let errors = [];

    // CHecking if user entered any null data
    if (userName == undefined || userName == "" || userName.trim() == "") errors.push('Please provide a user name.');

    if (userEmail == undefined || userEmail == "" || userEmail.trim() == "") {
        errors.push('Please provide an email.');
    } else {
        // Validates a user's email.
        const isEmailValid = checkEmailValidity(userEmail);
        if (!isEmailValid) errors.push('Please provide a valid email.');
    }

    if (userPassword == undefined || userPassword == "" || userPassword.trim() == "") errors.push('Please enter a password.');

    if ( userGender == undefined || userGender == "" || userGender.trim() == "" ) errors.push("Please prove your gender.");

    return errors;
}

// Returns an array of error messages if user didn't give email and otp.
const validateVerificationData = (email, OTP) => {
    
    let errors = [];
    
    if (email == undefined || email == "") {
        errors.push('Please Provide your email.');
    } else {

        const isEmailValid = checkEmailValidity(email);
        if (!isEmailValid) errors.push('Please provide a valid email.');

    }

    if (OTP == undefined || OTP == "") errors.push('Please Enter your OTP.');

    return errors
}

// Validates the email and password.
const checkSignInData = (email, password) => {
    
    let errors = [];
    
    if (email == undefined || email == "") {
        errors.push('Please provide a email.');
    } else {
        const isEmailValid = checkEmailValidity(email);
        if (!isEmailValid) errors.push('Please provide a valid email.');
    }

    if (password == undefined || password == "") errors.push('Please Enter your password.');

    return errors;
}