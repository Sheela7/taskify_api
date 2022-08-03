const userModel = require('../models/user.js');
const otpService = require("../services/otp.js");
const passwordHash = require("../services/hashed_password.js");
const emailService = require("../services/email_service.js");


module.exports.signUpUser = async (req, res) => {
    const userEmail = req.body.email;
    const userName = req.body.name;
    const userPassword = req.body.password;

 const errors = validateSignupData(userName,userEmail,userPassword);   
    if (errors.length > 0) {
        throw errors;
    }
    else {
        //Queriying- (data magnu) into the user model for data with email, --userEmail.- usermodel bata userEmail ko data tanna khojya
        const emailData = await userModel.findOne({ email: userEmail });
        //email data null xa ki xaena check grya- kina vani email data null vanya userEmail register vako xaena ra email data null xaena vni user already register xa
        if (emailData != null) {
            throw "This email already exists";
        }
        //findone- mathi email jun mageko tesko data query grna khojeko , xa vni tyo email snga related document=line of rrow  return grxa xaena vani null return grxa.    
        const nameData = await userModel.findOne({ name: userName });
        if (nameData != null) {
            throw "This username already exists";
        }
        //each tham ma otpService.generate() garyo vani naya otp generate hunxa so, eslai euta kunai variable maa haleraa reuse garda same otp data janxa 
 const userData  =  await createNewUser(userName,userEmail,userPassword);
        
        res.json({ "status": "success", "message": "user successfully registered", "data": userData })
    }

}

const validateSignupData = (userName,userEmail,userPassword)=>{
    let errors = []

    if (userEmail == undefined || userEmail == "") {
        errors.push("Please provide user email")
    } else {

        const isEmailValid = checkEmailValidity(userEmail);

        if (!isEmailValid) {
            errors.push("Please provide valid email")
        }
    }

    if (userName == undefined || userName == "") {
        errors.push("Please enter user name")
    }
    if (userPassword == undefined || userPassword == "") {
        errors.push("Please enter user password");
    }
    return errors;
}


const createNewUser=async(userName,userEmail,userPassword)=>{
const generatedOTP = otpService.generateOTP();
        const generatedHashedPassword = await passwordHash.hashPassword(userPassword);
        console.log(generatedHashedPassword);
        const userData = await userModel.create({
            name: userName,
            email: userEmail,
            password: generatedHashedPassword,
            otp: generatedOTP
        });

        const newUserData = {
            '_id': userData._id,
            'name': userData.name,
            'email': userData.email,
            'created': userData.created,
            'isVerified': userData.isVerified
        };
        await emailService.sendOtpMail(userEmail, generatedOTP)
        return newUserData;
}




module.exports.verifyEmail = async (req, res) => {
    const OTP = req.body.otp;
    const email = req.body.email;

   const errors = validateVerifyEmailData(email,OTP); 
    if (errors.length > 0) {
        throw errors
    } else {
        const emailData = await userModel.findOne({ email: email });

        if (emailData == null) {
            throw "This email is not registerd."; }

        if (emailData.isVerified == true) {
            throw "This email is already verified.";
        }

        if (emailData.otp != OTP) {
            throw "This OTP is incorrect.";
        } else {
            await userModel.findByIdAndUpdate(emailData._id, {
                isVerified: true
            });
            res.json({ "status": "success", "message": "User verified successfully", "data": null })
        }
    }
}

const validateVerifyEmailData = (email,OTP)=>{
let errors = []
    if (email == undefined || email == "") {
        errors.push("Please provide email")
    } else {

        const isEmailValid = checkEmailValidity(email);
        if (!isEmailValid) {
            errors.push("Please provide valid email")
        }
    }
    if (OTP == undefined || OTP =="") {
        errors.push("Please provide otp")
    }

    return errors;
}

const checkEmailValidity = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValid = re.test(String(email).toLowerCase());
    return isEmailValid;
}