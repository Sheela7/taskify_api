const userModel = require(`../models/user.js`);
const planner = require(`../models/planner.js`);

module.exports.addPlan = async (req, res) => {

    // ----- User's Inputs
    const title = req.body.title;
    const note = req.body.note;
    const date = req.body.date;
    // const startTime = req.body.startTime;
    // const endTime = req.body.endTime;
    const reminder = req.body.reminder;
    const repeat = req.body.repeat;

    const userEmail = req.body.email;

    // ----- Validate User's Input
    const errors = validateUserInputs(title, date);

    if (errors.length > 0) {
        throw errors;
    } else {

        const emailData = await userModel.findOne({ email: userEmail });

        const planData = await planner.create({
            title: title,
            note: note,
            date: date,
            // startTime: startTime,
            // endTime: endTime,
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

const validateUserInputs = (title, date) => {

    let errors = [];

    if (title == undefined || title == "" || title.trim() == "") {
        errors.push('Title is required.')
    }

    if (date == null || date == "") {
        errors.push("Date is required");
    }

    // if (startTime == null || startTime == "") {
    //     errors.push("Start time is required");
    // }

    // if (endTime == null || endTime == "") {
    //     errors.push("End time is required.");
    // }

    return errors;
}