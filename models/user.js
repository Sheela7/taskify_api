const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    created_date: {
        type: Date,
        default: date.now
    }, 

    otp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)



