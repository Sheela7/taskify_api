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
    const userPassword = req.body.password

    let errors = []

    if(userEmail==undefined){
        errors.push("Please enter user email")
    }
    if(userName==undefined){
        errors.push("Please enter user name")
    }
    if(userPassword==undefined){
        errors.push("Please enter user password")
    }
    if(errors.length > 0){
        throw errors
    } 
    else{
//Queriying- (data magnu) into the user model for data with email, --userEmail.- usermodel bata userEmail ko data tanna khojya
        const emailData = await userModel.findOne({email: userEmail});
       //email data null xa ki xaena check grya- kina vani email data null vanya userEmail register vako xaena ra email data null xaena vni user already register xa
        if(emailData != null){
            throw "This email already exists";
        }
        console.log(emailData)
   //findone- mathi email jun mageko tesko data query grna khojeko , xa vni tyo email snga related document=line of rrow  return grxa xaena vani null return grxa.    
        const nameData = await userModel.findOne({name: userName });
        if(nameData != null){
            throw "This username already exists";
        }
        console.log(nameData)
        //each tham ma otpService.generate() garyo vani naya otp generate hunxa so, eslai euta kunai variable maa haleraa reuse garda same otp data janxa 
     const generatedOTP = otpService.generateOTP()
     console.log(generatedOTP)
     const generatedHashedPassword = await passwordHash.hashPassword(password);
     console.log(generatedHashedPassword)
        const userData = await userModel.create({
            name: userName,
            email:  userEmail,
            password: generatedHashedPassword,
            otp: generatedOTP 
    });
    console.log(userData)
 
    await emailService.sendOtpMail(userEmail, generatedOTP)
    res.json({"status": "success" ,"message": "user successfully registered" , "data" : userData})
    }












module.exports.verifyEmail = (req, res) => {


}}