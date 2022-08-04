const router = require('express').Router();
const Controller = require("../controllers/authController.js")

router.post('/signup', Controller.signUpUser);
router.post('/verify', Controller.verifyEmail);
// router.post('/signin', Controller.signIn)

module.exports = router;