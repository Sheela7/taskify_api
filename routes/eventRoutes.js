const router = require(`express`).Router();
const controller = require('../controllers/eventController.js');
const errorHandler = require('../middleware/error_handler.js');
const tokenvalidator = require('../middleware/token_validator.js');

router.post('/addevent', errorHandler(tokenvalidator.accessTokenValidator), errorHandler(controller.addEvent));


module.exports = router;