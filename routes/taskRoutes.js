const router = require('express').Router();
const controller = require('../controllers/taskController.js');
const errorHandler = require('../middleware/error_handler.js');
const tokenvalidator = require('../middleware/token_validator.js');


// router.post('/task', errorHandler(tokenvalidator.accessTokenValidator),errorHandler(controller.taskController));
// router.get('/gettask', errorHandler(tokenvalidator.accessTokenValidator),errorHandler(controller.getTask));
router.post('/task',  errorHandler(tokenvalidator.accessTokenValidator),errorHandler(controller.taskController),)
module.exports = router;