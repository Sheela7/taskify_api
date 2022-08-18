// Importing all requiring modules.
const router = require('express').Router();
const controller = require('../controllers/taskController.js');
const errorHandler = require('../middleware/error_handler.js');
const tokenvalidator = require('../middleware/token_validator.js');

// route to Create a new task.
router.post('/task', errorHandler(tokenvalidator.accessTokenValidator),errorHandler(controller.taskController));

// Route to Get task according to date.
router.get('/gettask/:date', errorHandler(tokenvalidator.accessTokenValidator),errorHandler(controller.getTask));

module.exports = router;