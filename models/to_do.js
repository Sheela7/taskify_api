const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },

    isCompleted: {
        type: Boolean,
        default: false
    },

    toDoDate: {
        type: Date,
        required: true
    },

    reminder: {
        type: Number,
        required: true
    },

    priority: {
        type: String,
        lowercase: true,
        enum: [
            'low', 'medium', 'high'
        ],
        default: "low",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

module.exports = mongoose.model('tasks', taskSchema);