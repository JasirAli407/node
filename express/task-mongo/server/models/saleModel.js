const mongoose = require('mongoose')

const saleSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },

    item_name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    total_sales: {
        type: Number,
        required: true
    },
})

const Sale = mongoose.model('Sale', saleSchema)

module.exports = Sale;

