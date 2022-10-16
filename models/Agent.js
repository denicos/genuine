const mongoose = require('mongoose');
const AgentSchema = mongoose.Schema({
    name: {
        type: String,

    },
    company: {
        type: String,

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