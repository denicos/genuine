const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        index: true
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

const Category = module.exports = mongoose.model('Category', CategorySchema);