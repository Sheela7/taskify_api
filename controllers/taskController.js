// Importing all requiring modules.
const taskModel = require('../models/to_do.js');
const userModel = require(`../models/user.js`);


// Creates a task.
module.exports.taskController = async (req, res) => {
    
    // Taking user's entered data
    const task = req.body.title;
    const toDoDate = req.body.toDoDate;
    const reminder = req.body.reminder;
    const priority = req.body.priority;
    const userEmail = req.body.email;

    const emailData = await userModel.findOne({email: userEmail});

    // Task Works
    const errors =  validateToDoInput( task, toDoDate, reminder );

    if( errors.length > 0 ){
        throw errors;
    } else {

        // Check if the task is already in database.
        const dbTask = await taskModel.findOne({ userId: emailData._id , title: task.trim() });
        if ( dbTask != null ) {
            throw "This task already exist."
        } else {

            const taskData = await taskModel.create({
                title: task,
                toDoDate: toDoDate,
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
}

// List the plans of a task.
module.exports.getTask = async (req, res) => {

    const date = req.params.date;
    const userEmail = req.body.email;

    if ( date == null || date == "" ) {
        throw "date is required.";
    } else {

        const emailData = await userModel.findOne({ email: userEmail });

        // Get a tasks for a user of specific date.
        const taskData = await taskModel.find({ 
            userId: emailData._id, 
            date: { 
                $gte: new Date(new Date(date).setHours(00, 00, 00)),
                $lte: new Date(new Date(date).setHours(23, 59, 59))
            }
        });

        res.json({
            "status": "success",
            "message": `successfully listed the plans of ${date}`,
            "data": taskData
        });
    }
}

// Validates the input for a ToDo.
const validateToDoInput = ( task, toDoDate, reminder ) => {
    let errors = [];

    if ( task == undefined || task == "" || task.trim() == "" ) errors.push("Title is Required.");

    if ( toDoDate == null || toDoDate == "" ) errors.push("Date is required.");

    if ( reminder == null || reminder == "" ) errors.push("Reminder cannot be null.");

    return errors;
}