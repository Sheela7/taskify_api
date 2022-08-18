// Importing all requiring modules.
const router = require('express').Router();
const Controller = require("../controllers/authController.js");
const errorHandler = require('../middleware/error_handler.js');
const tokenValidator = require('../middleware/token_validator.js');

// Sign up a user.
router.post('/signup', errorHandler(Controller.signUpUser));

// Verify a user's email address
router.post('/verify', errorHandler(Controller.verifyEmail));

// Sign in a user.
router.post('/signin', errorHandler(Controller.signIn));


// Generates a new access token.
router.post('/generateToken', errorHandler(tokenValidator.refreshTokenValidator) ,errorHandler(Controller.accessTokenGenerator));

module.exports = router;