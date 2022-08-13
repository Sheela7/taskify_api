const TaskModel = require('../models/task.js');
const jwtHandler = require(`../services/jwt_handler.js`);
const userModel = require(`../models/user.js`);

module.exports.taskController = async (req, res) => {
    const task = req.body.task;
    const userEmail = req.body.email;
    const emailData = await userModel.findOne({email: userEmail});

    // Task Works
    if(task == undefined || task == "" ){
        throw "Task can't be null."
    } else {
        const taskData = await TaskModel.create({
            task: task,
            userId: emailData._id
        });

        res.json({
            "status": "Success",
            "message": "Task Added",
            "data": taskData
        });
    }
}

module.exports.getTask = async (req, res) => {
   
    const userEmail = req.body.email;
    const taskList = await TaskModel.find({email: userEmail});

    res.json({
        "status": "Success",
        "message": "Task List extraction complete",
        "data": taskList
    })
}