const bcrypt = require("bcrypt")
const saltRound = 10;

module.exports.hashPassword =async (password)=>{
    // console.log(password)
    const hashedPassword= await bcrypt.hash(password,saltRound);
    return hashedPassword;
}
module.exports.verifyPasswordHash =async (userPassword,hashPassword)=>{
    // console.log(password)
    const isMatched = await bcrypt.compare( userPassword,hashPassword);
    return isMatched;
}
  
