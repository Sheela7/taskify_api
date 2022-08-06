const router = require('express').Router();
const Controller = require("../controllers/authController.js");
const errorHandler = require('../middleware/error_handler.js');

router.post('/signup', errorHandler(Controller.signUpUser));
router.post('/verify', errorHandler(Controller.verifyEmail));
// router.post('/signin', Controller.signIn)

module.exports = router;