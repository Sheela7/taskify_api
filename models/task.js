const mongoose = require('mongoose');

// mongoose.connect(process.env.DATABASE_URL);

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

module.exports = mongoose.model('tasks', taskSchema);