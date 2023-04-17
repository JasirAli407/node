const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
   
    // here we r handling relationship User & Contact schema
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // we reference user model
        ref: 'User'
    },
    name: {
        type: String,

        // error vannal 2nd element in the array kanikkum
        required: [true, 'Please add the contact name']
    },

    email: {
        type: String,

        // error vannal 2nd element in the array kanikkum
        required: [true, 'Please add the contact email']
    },

    phone: {
        type: String,

        // error vannal 2nd element in the array kanikkum
        required: [true, 'Please add the contact phone']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Contact', contactSchema)

