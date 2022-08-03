const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      created: {
        type: String,
        default: new Date().toISOString(),
      },
      password: {
        type: String,
        required: true,
      },
    
      otp: {
        type: String,
        required: true
      },
      isVerified: {
        type: Boolean,
        default: false
      }
    });
 

module.exports = mongoose.model('users', userSchema)



