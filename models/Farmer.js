const mongoose = require('mongoose');

const FarmerSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    price: {
        type: String
    },
    product: {
        type: String
    },
    contact: {
        type: String
    },
    address: {
        type: String
    },
    status: {
        type: String,
        default: 'unapproved',
        enum: ['unapproved', 'approved']
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Farmer = module.exports = mongoose.model('Farmer', FarmerSchema);