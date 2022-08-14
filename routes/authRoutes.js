const router = require('express').Router();
const Controller = require("../controllers/authController.js")
const errorHandler =require("../middleware/error_handler.js")
router.post('/signup', errorHandler(Controller.signUpUser));
router.post('/verify', errorHandler(Controller.verifyEmail));
router.post('/login', errorHandler(Controller.loginUser));
router.post('/generateToken', errorHandler(Controller.generateNewAccessToken));
const jwt = require('jsonwebtoken');


function auth(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user  = isVerified;
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}





module.exports = router;