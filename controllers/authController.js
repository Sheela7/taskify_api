const userModel = require('../models/user.js');



module.exports.signUpUser = async (req, res) => {
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    let errors = [];

    if(userName == undefined || userName == ""){
        errors.push('Please provide a user name.');
    }

    if ( userEmail == undefined || userEmail == "" ) {
        errors.push('Please provide an email.');
    }

    if(userPassword == undefined || userPassword == "") {
        errors.push('Please enter a password.')
    }

    if(errors.length > 0) {
        throw errors;
    } else {

        // Checking If Provided email already exist in DB 
        const emailData = await userModel.findOne({email: userEmail});
        if( emailData != null){
            throw ('This Email already exist.');
        }

        // Checking If Provided Name already exist in DB 
        const nameData = await userModel.findOne({name: userName});
        if(nameData != null ){
         throw ('this name already exits');
        }

    
        const userData = await userModel.create({
            name: userName,
            email: userEmail,
            password: userPassword
        })
    

    }

    
}



module.exports.verifyEmail = (req, res) => {


}