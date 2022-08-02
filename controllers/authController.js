const userModel = require('../models/user.js');

module.exports.signUpUser = async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;

    res.json({"message":"Complted"})
}



module.exports.verifyEmail = (req, res) => {


}