const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Agent  Schema
const AgentSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    company: {
        type: String,
        index: true
    },
    contact: {
        type: String,

    },
    address: {
        type: String
    },
    agent_type: {
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

const Agent = module.exports = mongoose.model('Agent', AgentSchema);