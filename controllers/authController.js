const userModel = require('../models/user.js');

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
        
    }
}



module.exports.verifyEmail = (req, res) => {


}