const eventModel = require(`../models/event.js`);
const userModel = require(`../models/user.js`);

module.exports.addEvent = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const reminder = req.body.reminder;
    const eventDate = req.body.eventDate;
    const repeat = req.body.repeat;
    const userEmail = req.body.email;
    
    const emailData = await userModel.findOne({ email: userEmail });

    // VALIDATE THE DATA
    const errors = validateEventInput( title, description, reminder, eventDate, repeat );
    
    if(errors.length > 0 ){
        throw errors;
    } else {
        const eventData = await eventModel.create({
            title: title,
            description: description,
            reminder: reminder,
            eventDate: eventDate,
            repeat: repeat,
            userId: emailData._id
        });

        res.json({
            "status": "success",
            "message": "Successfully added the event.",
            "data": eventData
        });
    }
}

// CHECK if input is null or not
const validateEventInput = ( title, description, reminder, eventDate, repeat ) => {

    let errors = [];

    if (title == undefined || title == "" || title.trim() == "" ) {
        errors.push("title cannot be null.");
    }

    if ( description == undefined || description == "" || description.trim() == "" ) {
        errors.push("Description cannot be null.");
    }

    if ( reminder == null || reminder == "" ) {
        errors.push("Reminder cannot be null.");
    } 

    if ( eventDate == null || eventDate == "" ) {
        errors.push("Eventdate cannot be null.");
    }

    return errors;
}