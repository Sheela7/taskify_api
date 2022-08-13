const userModel = require("../models/user.js");
const otpService = require("../services/otp.js");
const passwordHash = require("../services/hashed_password.js");
const emailService = require("../services/email_service.js");
const jwt = require("jsonwebtoken");
const user = require("../models/user.js");
//TO DO: Take user details.
// TO DO: Check error if exists in user input
// TO DO: Check if email and username already exists in db
// TO DO: set new user if not exist

module.exports.signUpUser = async (req, res) => {
  const userEmail = req.body.email;
  const userName = req.body.name;
  const userPassword = req.body.password;

  const err = signUpValidation(userName, userEmail, userPassword);
  //Difference between return error and throw errors
  //It depends on where you want your control. throw immediately hands control back
  //to the caller: See MDN: "and control will be passed to the first catch block in the call stack.
  //If no catch block exists among caller functions, the program will terminate.", while if you
  //return a new Error, you have to handle it a different way, in another location
  if (err.length > 0) {
    throw err;
  } else {
    //Queriying- (data magnu) into the user model for data with email, --userEmail.- usermodel bata userEmail ko data tanna khojya
    const emailData = await userModel.findOne({ email: userEmail });
    //email data null xa ki xaena check grya- kina vani email data null vanya userEmail register vako xaena ra email data null xaena vni user already register xa
    //findone- mathi email jun mageko tesko data query grna khojeko , xa vni tyo email snga related document=line of rrow  return grxa xaena vani null return grxa.
    if (emailData != null) {
      throw "This email already exists";
    }

    const nameData = await userModel.findOne({ name: userName });
    if (nameData != null) {
      throw "This username already exists";
    }
    //kai error xaena vani ani username db ma registered xaena vani naya user banawna agadi badni
    const userData = await createUser(userName, userEmail, userPassword);
    res.json({
      status: "success",
      message: "user successfully created and registered",
      data: userData,
    });
  }
};
//differn between errors.push in errors array and throe is:
const signUpValidation = (userName, userEmail, userPassword) => {
  let errors = [];

  if (userEmail == undefined || userEmail == "") {
    errors.push("Please provide user email");
  } else {
    const isEmailValid = checkEmailValidity(userEmail);
    if (!isEmailValid) {
      errors.push("Please provide valid email");
    }
  }
  if (userName == undefined || userName == "") {
    errors.push("Please enter user name");
  }
  if (userPassword == undefined || userPassword == "") {
    errors.push("Please enter user password");
  }
  return errors;
};

const createUser = async (userName, userEmail, userPassword) => {
  //each tham ma otpService.generate() garyo vani naya otp generate hunxa so, eslai euta kunai variable maa haleraa reuse garda same otp data janxa
  const generatedOTP = otpService.generateOTP();
  const generatedHashedPassword = await passwordHash.hashPassword(userPassword);
  const userData = await userModel.create({
    name: userName,
    email: userEmail,
    password: generatedHashedPassword,
    otp: generatedOTP,
  });
  //   console.log(userData)
  const newUserData = {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    created: userData.created,
    isVerified: userData.isVerified,
  };
  // console.log(newUserData)
  await emailService.sendOtpMail(userEmail, generatedOTP);
  return newUserData;
};

module.exports.verifyEmail = async (req, res) => {
  const OTP = req.body.otp;
  const Email = req.body.email;

  const err = ValidateVerifyEmailData(Email, OTP);
  if (err.length > 0) {
    throw err;
  } else {
    const emailData = await userModel.findOne({ email: Email });

    if (emailData == null) {
      throw "This email is not registered";
    }
    if (emailData.isVerified == true) {
      throw "This email is already verified";
    }
    if (emailData.otp != OTP) {
      throw "This OTP is incorrect";
    } else {
      const verifiedEmail = await userModel.findByIdAndUpdate(emailData._id, {
        isVerified: true,
      });
      const newUserData = {
        _id: verifiedEmail._id,
        name: verifiedEmail.name,
        email: verifiedEmail.email,
        created: verifiedEmail.created,
        isVerified: true,
      };
      res.json({
        status: "success",
        message: "Userverified Succcessfully",
        data: newUserData,
      });
    }
  }
};

const ValidateVerifyEmailData = (Email, OTP) => {
  let errors = [];
  if (Email == undefined || Email == "") {
    errors.push("Please provide user email");
  } else {
    const isEmailValid = checkEmailValidity(Email);
    if (!isEmailValid) {
      errors.push("Please provide valid email");
    }
  }
  if (OTP == undefined || OTP == "") {
    errors.push("Please provide user otp");
  }
  return errors;
};

//Login to system code:
module.exports.loginUser = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const err = loginValidation(userEmail, userPassword);
  if (err.length > 0) {
    throw err;
  } else {
    const emailData = await userModel.findOne({ email: userEmail });
    if (emailData == null) {
      throw "This email is not registered";
    }
    if (emailData.isVerified == false) {
      throw "This email is not verified";
    }
    const generatedHashedPassword = await passwordHash.verifyPasswordHash(
      userPassword,
      emailData.password
    );
    if (generatedHashedPassword == false) {
      throw "Your password is incorrect";
    } else {
      const accessToken = token.createNewAccessToken(emailData.email);
      const refreshToken = token.createNewRefreshToken(emailData.email);
      res.json({
        status: "success",
        message: "Login Succcessfully",
        data: { "access-token": accessToken, refreshToken: refreshToken },
      });
    }
  }
};
// }
const loginValidation = (userEmail, userPassword) => {
  let errors = [];

  if (userEmail == undefined || userEmail == "") {
    errors.push("Please provide user email");
  } else {
    const isEmailValid = checkEmailValidity(userEmail);
    if (!isEmailValid) {
      errors.push("Please provide valid email");
    }
  }
  if (userPassword == undefined || userPassword == "") {
    errors.push("Please enter user password");
  }
  return errors;
};

const checkEmailValidity = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isEmailValid = re.test(String(email).toLowerCase());
  return isEmailValid;
};
