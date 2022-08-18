const mongoose = require('mongoose');

const plannerSchema = new mongoose.Schema({
    
    title: {
        type: String,
        max: 30,
        required: true
    },

    note: {
        type: String
    },

    startTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true
    },

    reminder: {
        type: Number,
        default: 5
    },

    repeat: {
        type: String,
        lowercase: true,
        enum: [ "none", "daily", "weekly", "monthly" ],
        default: "none"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

module.exports = mongoose.model('plans', plannerSchema);