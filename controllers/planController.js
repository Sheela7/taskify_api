// Importing the required Modules.
const userModel = require(`../models/user.js`);
const planModel = require(`../models/planner.js`);

// Add a plan to a user
module.exports.addPlan = async (req, res) => {

    // ----- User's Inputs
    const title = req.body.title;
    const note = req.body.note;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const reminder = req.body.reminder;
    const repeat = req.body.repeat;

    const userEmail = req.body.email;
    const emailData = await userModel.findOne({ email: userEmail });

    // ----- Validate User's Input
    const errors = validateUserInputs(title, date);

    if (errors.length > 0) {
        throw errors;
    } else {

        const dbPlanData = await planModel.findOne({ userId: emailData._id, title: title.trim() });
        if (dbPlanData != null) {
            throw "This plan already exist.";
        } else {
            const planData = await planModel.create({
                title: title,
                note: note,
                startTime: startTime,
                endTime: endTime,
                reminder: reminder,
                repeat: repeat,
                userId: emailData._id
            });

            res.json({
                "status": "success",
                "message": "plan added successfully.",
                "data": planData
            });
        }
    }
}

// Validates the user inputs. Returns an array of errors.
const validateUserInputs = (title, startTime, endTime) => {

    let errors = [];

    if (title == undefined || title == "" || title.trim() == "") errors.push('Title is required.');

    if (startTime == null || startTime == "") errors.push("Start time is required");

    if (endTime == null || endTime == "") errors.push("End time is required.");

    return errors;
}


// List the plans of a user.
module.exports.getPlans = async (req, res) => {

    const date = req.params.date;
    const userEmail = req.body.email;

    if (date == null || date == "") {
        throw "date is required.";
    } else {

        const emailData = await userModel.findOne({ email: userEmail });

        // Get a plan for a user of specific date.
        const planData = await planModel.find({
            userId: emailData._id,
            date: {
                $gte: new Date(new Date(date).setHours(00, 00, 00)),
                $lte: new Date(new Date(date).setHours(23, 59, 59))
            }
        });

        res.json({
            "status": "success",
            "message": `successfully listed the plans of ${date}`,
            "data": planData
        })
    }
}