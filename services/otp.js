const otpGenerator = require(`otp-generator`);

// Generates a new OTP.
module.exports.otpGenerator = () => {
    const generatedOtp = otpGenerator.generate(4, { 
        lowerCaseAlphabets:false, 
        upperCaseAlphabets: false, 
        specialChars: false 
    });

    return `${generatedOtp}`;
}