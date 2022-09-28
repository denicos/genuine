const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


//get admin index
router.get('/index', function(req, res) {
    res.render('admin/admin_index', { layout: 'admin' });
});

module.exports = router;