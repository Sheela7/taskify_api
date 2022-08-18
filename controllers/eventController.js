// Importing all the required modules
const eventModel = require(`../models/event.js`);
const userModel = require(`../models/user.js`);

// Adds an event to a reminder.
module.exports.addEvent = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const reminder = req.body.reminder;
    const eventDate = req.body.eventDate;
    const repeat = req.body.repeat;
    const userEmail = req.body.email;

    const emailData = await userModel.findOne({ email: userEmail });

    // VALIDATE THE DATA
    const errors = validateEventInput( title, description, reminder, eventDate );
    
    if(errors.length > 0 ){
        throw errors;
    } else {
        const dbEvent = await eventModel.findOne({ userId: emailData._id, title: title.trim() });
        if( dbEvent != null ){
            throw "This event already exist.";
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
}

// Validates the input for an event.
const validateEventInput = ( title, description, reminder, eventDate ) => {

    let errors = [];

    if (title == undefined || title == "" || title.trim() == "" ) errors.push("title is required.");

    if ( description == undefined || description == "" || description.trim() == "" ) errors.push("Description is required.");

    if ( reminder == null || reminder == "" ) errors.push("Reminder is required.");

    if ( eventDate == null || eventDate == "" ) errors.push("Event date is required.");

    return errors;
} 

// Retrieve the past events for a user.
module.exports.getPastEvent = async (req, res) => {
    const currentDate = Date.now();
    const userEmail = req.body.email;

    const emailData = await userModel.findOne({ email: userEmail });

    // Returns a sorted list of past events for the given user.
    const pastEventData = await eventModel.find({
        userId: emailData._id ,
        eventDate: {
            $lt: new Date(new Date(currentDate).setHours(00, 00, 00))
        }
    }).sort({ eventDate: 'ascending'});

    //.sort({ eventDate: 'ascending'}) arrange the data in accending order

    res.json({
        "status": "success",
        "message": "Retrieved past events successfully.",
        "data": pastEventData
    });
}



// Retrieves today's events for a user.
module.exports.getEvent = async (req, res) => {
    const currentDate = Date.now();
    const userEmail = req.body.email;

    const emailData = await userModel.findOne({ email: userEmail });

    // Returns a sorted list of today's events in accending order for the given user.
    const presentEventData = await eventModel.find({
        userId: emailData._id ,
        eventDate: {
            $gte: new Date(new Date(currentDate).setHours(00, 00, 00)),
            $lte: new Date(new Date(currentDate).setHours(23, 59, 59))
        }
    }).sort({ eventDate: 'ascending'});
    res.json({
        "status": "success",
        "message": "Retrieved today's events successfully.",
        "data": presentEventData
    });
}

// Retrieves upcoming events for a user.
module.exports.getFutureEvent = async (req, res) => {
    const currentDate = Date.now();
    const userEmail = req.body.email;

    const emailData = await userModel.findOne({ email: userEmail });

    // Returns a sorted list of upcoming events for the given user.
    const upcomingEventData = await eventModel.find({
        userId: emailData._id ,
        eventDate: {
            $gte: new Date(new Date(currentDate).setHours(23, 59, 59))
        }
    }).sort({ eventDate: 'ascending'});

    res.json({
        "status": "success",
        "message": "Retrieved Upcoming events successfully.",
        "data": upcomingEventData
    });
}