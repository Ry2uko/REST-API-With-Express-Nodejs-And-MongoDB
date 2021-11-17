const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    followedUser: {
        type: String,
        required: true
    },
    followedDate: {
        type: Date,
        required: true,
        default: Date.now  
    }
})

module.exports = mongoose.model('User', userSchema)