const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Agent = require('../models/Agent')


//get admin index
router.get('/index', function(req, res) {
    res.render('admin/admin_index', { layout: 'admin' });
});

router.get('/clear', async(req, res) => {
    try {
        const agents = await Agent.find({ status: 'unapproved', agent_type: 'clearing' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_clearing', { layout: 'general', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});


//single approve view.
//@desc update agent
//@route PUT 
router.post('/approve/:id', async(req, res) => {
    const filter = { _id: req.params.id };
    const update = { status: "approved" };
    let agent = await Agent.findOneAndUpdate(filter, update, {
        new: true
    })
    console.log(agent.status)
})


//get login and register page
router.get('/auth', function(req, res) {
    res.render('admin/auth', { layout: 'admin' });
});

router.post('/auth', passport.authenticate('local', { failureRedirect: '/auth' }), async(req, res) => {
    req.session.user = req.user
    res.redirect('/index')
})
module.exports = router;