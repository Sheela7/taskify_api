const TaskModel = require("../models/task.js");

module.exports.taskController = async (req, res) => {
  const task = req.body.task;
  const id = req.body.userId;
  const bearerToken = req.headers["authorization"];
  const accessToken = bearerToken.split("")[1];

  if (accessToken == undefined || accessToken == "") {
    throw "Access token is required";
  }
  if (task == undefined || task == "") {
    throw "Task cant be null";
  } else {
    const taskData = await TaskModel.create({ task: task, userId: id });
    res.json({ status: "Success", message: "Task Added", data: taskData });
  }
};
