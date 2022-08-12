const router = require('express').Router();
const controller = require('../controllers/taskController.js');
const errorHandler = require('../middleware/error_handler.js');

router.post('/task', errorHandler(controller.taskController));

module.exports = router;