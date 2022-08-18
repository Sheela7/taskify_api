// Importing all requiring modules.
const userModel = require('../models/user.js');
const noteModel = require(`../models/notes.js`);


// Add a new note to a user
module.exports.addNote = async (req, res) => {

    const noteTitle = req.body.title;
    const note = req.body.note;
    const isImportant = req.body.isImportant;

    const userEmail = req.body.email;

    const emailData = await userModel.findOne({ email: userEmail });

    if (note == undefined || note == "" || note.trim() == "" ) {
        throw "This field is required."
    } else {

        const noteData = await noteModel.create({
            title: noteTitle,
            note: note,
            isImportant: isImportant,
            userId: emailData._id
        });

        res.json({
            "status": "success",
            "message": "successfully added note.",
            "data": noteData
        });
    }
}

// recieves the notes of a user
module.exports.getnotes = async (req, res) => {
    const userEmail = req.params.email;

    const emailData = await userModel.findOne({ email: userEmail });

    const noteData = await noteModel.find({ userId: emailData._id });

    res.json({
        "status": "success",
        "message": `successfully recieved notes of ${emailData.name}`,
        "data": noteData
    });
}