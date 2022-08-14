const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

module.exports = mongoose.model('taskModel', taskSchema);