const mongoose = require(`mongoose`);

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        max: 50
    },

    note: {
        type: String,
        required: true
    },

    isImportant: {
        type: Boolean,
        default: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

module.exports = mongoose.model('notes', noteSchema);