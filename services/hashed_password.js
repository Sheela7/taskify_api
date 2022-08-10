const bcrypt = require("bcrypt")
const saltRound = 10;

module.exports.hashPassword =async (password)=>{
    // console.log(password)
    const hashedPassword= await bcrypt.hash(password,saltRound);
    return hashedPassword;
}