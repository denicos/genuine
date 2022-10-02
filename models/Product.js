const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    quantity: {
        type: String,
    },
    quantity_type: {
        type: String,
        index: true
    },
    contact: {
        type: String,
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

const Product = module.exports = mongoose.model('Product', ProductSchema);