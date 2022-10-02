const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');

// Admin  Schema
const AdminSchema = mongoose.Schema({
    firstname: {
        type: String,
        index: true
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String
    },
});

AdminSchema.plugin(passportLocalMongoose, { usernameField: "username" });

const Admin = module.exports = mongoose.model('Admin', AdminSchema);