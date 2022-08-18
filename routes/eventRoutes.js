const router = require(`express`).Router();
const controller = require('../controllers/eventController.js');
const errorHandler = require('../middleware/error_handler.js');
const tokenvalidator = require('../middleware/token_validator.js');

// ----- Get events from user
router.post('/addevent', errorHandler(tokenvalidator.accessTokenValidator), errorHandler(controller.addEvent));

// ----- Get events from server for user
router.get('/pastevent', errorHandler(tokenvalidator.accessTokenValidator), errorHandler(controller.getPastEvent));
router.get('getevent', errorHandler(tokenvalidator.accessTokenValidator), errorHandler(controller.getEvent));
router.get('upcomingevent', errorHandler(tokenvalidator.accessTokenValidator), errorHandler(controller.getFutureEvent));

module.exports = router;