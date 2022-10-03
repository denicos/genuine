const mongoose = require('mongoose');

const SpaceSchema = mongoose.Schema({
    destination: {
        type: String,
    },
    airline: {
        type: String,
        index: true
    },
    departure_date: {
        type: String,
    },
    contact: {
        type: String
    },
    weight: {
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

const Space = module.exports = mongoose.model('Space', SpaceSchema);