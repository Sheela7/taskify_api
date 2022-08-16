const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    reminder: {
        type: Number,
    },

    eventDate: {
        type: Date,
    },

    repeat: {
        type: Boolean,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

});


module.exports = mongoose.model('events', eventSchema);