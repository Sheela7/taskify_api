const router = require('express').Router();
const Controller = require("../controllers/authController.js")

router.post('/signup', Controller.signUpUser);
router.post('/verify', Controller.verifyEmail);

module.exports = router;