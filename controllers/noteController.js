const userModel = require('../models/user.js');
const noteModel = require(`../models/notes.js`);


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
        })
    }
}