const router = require('express').Router();
const controller = require("../controllers/taskController.js")
const errorHandler =require("../middleware/error_handler.js")

router.post('/task', errorHandler(controller.taskController));
router.post('/getAllTask', errorHandler(controller.getAllTaskController));

module.exports = router;

