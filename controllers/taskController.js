const TaskModel = require("../models/task.js");
const userModel = require('../models/user.js')
const jwtHandler = require('../services/jwt_handler.js');

module.exports.taskController = async (req, res) => {
  const task = req.body.task;

  const bearerToken = req.headers["authorization"];

  if (bearerToken == undefined || bearerToken == "" || bearerToken.trim() == "") {
    throw "Access token is required";
  }

  const accessToken = bearerToken.split(" ")[1];

  const userEmail = await jwtHandler.validateAccessToken(accessToken);

  
  const emailData = await userModel.findOne({email: userEmail});

 // Task Works
    if(task == undefined || task == "" || task.trim() == "" ){
        throw "Task can't be null."
    } else {
        const taskData = await TaskModel.create({
            task: task,
            userId: emailData._id
        });

        const newData = {
          task: taskData.task,
        }

        res.json({
            "status": "Success",
            "message": "Task Added",
            "data": newData
        });
}
}
