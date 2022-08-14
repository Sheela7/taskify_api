const router = require('express').Router();
const controller = require('../controllers/taskController.js');
const errorHandler = require('../middleware/error_handler.js');
const accessTokenValidator = require('../middleware/token_validator');
const tokenValidator = require('../middleware/token_validator')


// router.post('/task',errorHandler(accessTokenValidator), errorHandler(controller.taskController));
router.post('/createTask', errorHandler(controller.createTaskController));

router.get('/getTasks',errorHandler(accessTokenValidator),errorHandler(controller.getAllTask))




module.exports = router;