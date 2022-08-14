const TaskModel = require('../models/task.js');
const jwtHandler = require("../services/jwt_handler.js");
const userModel = require("../models/user.js");

// module.exports.taskController1 = async (req, res) => {
//     const task = req.body.task;
//     const userEmail = req.body.userEmail;
//     //Getting user document for getting the ID for creating task
//     const userDocument = await userModel.findOne({ email: userEmail });

//     //Task work
//     if (task == undefined || task == "") {
//         throw "Task can't be null."
//     } else {
//         const taskData = await TaskModel.create({
//             task: task,
//             userId: userDocument._id
//         });

//         res.json({
//             "status": "Success",
//             "message": "Task Added",
//             "data": taskData
//         });
//     }
// }


module.exports.createTaskController = (req,res)=>{
    const task  = req.body.task;
   const authorizationToken = req.headers['authorization'];  
   if(authorizationToken==undefined  || authorizationToken==""){
    throw "Please provide authorization token"
   }

   console.log("hellh")

}



// //All task of the specific user
// module.exports.getAllTask = async (req, res) => {
//     const email = req.body.userEmail;
//     const taskList = await TaskModel.find({ email: email });
//     res.json({
//         "status": "Success",
//         "message": "Task retrieved",
//         "data": taskList
//     });
// }