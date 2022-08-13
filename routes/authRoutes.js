const router = require('express').Router();
const Controller = require("../controllers/authController.js");
const errorHandler = require('../middleware/error_handler.js');
const tokenValidator = require('../middleware/token_validator.js');

router.post('/signup', errorHandler(Controller.signUpUser));
router.post('/verify', errorHandler(Controller.verifyEmail));
router.post('/signin', errorHandler(Controller.signIn));
router.post('/generateToken', errorHandler(tokenValidator.refreshTokenValidator) ,errorHandler(Controller.accessTokenGenerator));

module.exports = router;