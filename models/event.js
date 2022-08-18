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
        default: 10
    },

    eventDate: {
        type: Date,
        required: true
    },

    repeat: {
        type: Boolean,
        default: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

});


module.exports = mongoose.model('events', eventSchema);