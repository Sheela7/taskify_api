// IMPORTING MODULES
const TaskModel = require('../models/to_do.js');
const userModel = require(`../models/user.js`);

// CREATE A TASK FOR SPECIFIC USER
module.exports.taskController = async (req, res) => {
    
    // Taking user's entered data
    const task = req.body.title;
    const eventDate = req.body.eventDate;
    const reminder = req.body.reminder;
    const priority = req.body.priority;
    const userEmail = req.body.email;

    const emailData = await userModel.findOne({email: userEmail});

    // Task Works
    const errors =  validateToDoInput( task, eventDate, reminder, priority );

    if( errors.length > 0 ){
        throw errors;
    } else {
        const taskData = await TaskModel.create({
            title: task,
            eventTime: eventDate,
            reminder: reminder,
            priority: priority,
            userId: emailData._id
        });

        res.json({
            "status": "Success",
            "message": "Task Added",
            "data": {
                "title": taskData.title,
                "isComplete": taskData.isCompleted,
                "eventDate": taskData.eventTime,
                "reminder": `${taskData.reminder}min`,
                "priority": taskData.priority
            }
        });
    }
}

// LIST ALL THE TASK CREATED BY A USER
module.exports.getTask = async (req, res) => {
   
    const userEmail = req.body.email;
    const taskList = await TaskModel.find({email: userEmail});

    res.json({
        "status": "Success",
        "message": "Task List extraction complete",
        "data": taskList
    })
}


// // CHECK if input is null or not
const validateToDoInput = ( task, eventDate, reminder, priority ) => {
    let errors = [];

    if ( task == undefined || task == "" || task.trim() == "" ) {
        errors.push("Task cannot be null.");
    }

    if ( eventDate == null || eventDate == "" ) {
        errors.push("Event date cannot be null.");
    }

    if ( reminder == null || reminder == "" ) {
        errors.push("Reminder cannot be null.");
    }

    if ( priority == undefined || priority == "" || priority.trim() == "" ) {
        errors.push("Priority cannot be null.");
    }

    return errors;
}