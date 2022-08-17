const router = require('express').Router();
const controller = require('../controllers/planController.js');
const errorHandler = require('../middleware/error_handler.js');
const tokenvalidator = require('../middleware/token_validator.js');

router.post('/addplan', errorHandler(tokenvalidator.accessTokenValidator), errorHandler(controller.addPlan));

module.exports = router;