const userModel = require('../models/user.js');
const otpService = require("../services/otp.js");
const passwordHash = require("../services/hashed_password.js");
const emailService = require("../services/email_service.js");
//TO DO: Take user details.
// TO DO: Check error if exists in user input
// TO DO: Check if email and username already exists in db
// TO DO: set new user if not exist



module.exports.signUpUser = async (req, res) => {
    const userEmail = req.body.email;
    const userName = req.body.name;
    const userPassword = req.body.password;

const errors = signUpValidation(userName,userEmail,userPassword);

if(errors.length > 0){
    throw errors
} 
else{
    //Queriying- (data magnu) into the user model for data with email, --userEmail.- usermodel bata userEmail ko data tanna khojya
    const emailData = await userModel.findOne({email: userEmail});
    //email data null xa ki xaena check grya- kina vani email data null vanya userEmail register vako xaena ra email data null xaena vni user already register xa
    //findone- mathi email jun mageko tesko data query grna khojeko , xa vni tyo email snga related document=line of rrow  return grxa xaena vani null return grxa.    
    if(emailData != null){
         throw "This email already exists";
     }
    
     const nameData = await userModel.findOne({name: userName });
     if(nameData != null){
         throw "This username already exists";
     }
    //kai error xaena vani ani username db ma registered xaena vani naya user banawna agadi badni 
    const userData = createUser(userName, userEmail, userPassword);
    res.json({"status":"success", "message": "user successfully created and registered", "data": userData})

}
}

const signUpValidation =(userName,userEmail,userPassword)=>{
    let errors = []

    if(userEmail==undefined || userEmail== ""){
        errors.push("Please provide user email")
    } else{
        const isEmailValid = checkEmailValidity(userEmail);
        if (!isEmailValid){
            errors.push("Please provide valid email")
        }
    }
    if(userName==undefined || userName==""){
        errors.push("Please enter user name")
    }
    if(userPassword==undefined || userPassword==""){
        errors.push("Please enter user password")
    }
    return errors;
    } 

    const checkEmailValidity =(email)=>{
        
    }
    

        //each tham ma otpService.generate() garyo vani naya otp generate hunxa so, eslai euta kunai variable maa haleraa reuse garda same otp data janxa 
     const generatedOTP = otpService.generateOTP()
     console.log(generatedOTP)
     const generatedHashedPassword = await passwordHash.hashPassword(userPassword);
     console.log(generatedHashedPassword)
        const userData = await userModel.create({
            name: userName,
            email:  userEmail,
            // password: userPassword,
            password: generatedHashedPassword,
            otp: generatedOTP 
    });
    console.log(userData)
 
    await emailService.sendOtpMail(userEmail, generatedOTP)
    res.json({"status": "success" ,"message": "user successfully registered" , "data" : userData})
    }




module.exports.verifyEmail = async (req, res) => {
    const OTP = req.body.otp;
    const Email = req.body.email;
    

    let errors = []
    if(Email==undefined){
        errors.push("Please provide user email")
    }
    if(OTP==undefined){
        errors.push("Please provide user otp")
    }
    if(errors.length > 0){
        throw errors
    } else{
        const emailData = await userModel.findOne({email: Email});
         if(emailData != null){
            // const verificationData = await userModel.t
            // OTP: otp
    }

}}}