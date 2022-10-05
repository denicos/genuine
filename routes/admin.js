const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Agent = require('../models/Agent')
const Category = require('../models/Category')
const Admin = require('../models/Admin');
const { ensureAuth, ensureGuest } = require('../helpers/auth')


//get admin index
router.get('/index', ensureAuth, function(req, res) {
    res.render('admin/admin_index', { layout: 'blank' });
});

router.get('/clear', ensureAuth, ensureGuest, async(req, res) => {
    try {
        const agents = await Agent.find({ status: 'unapproved', agent_type: 'clearing' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_clearing', { layout: 'blank', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/cleared', ensureAuth, ensureGuest, async(req, res) => {
    try {
        const agents = await Agent.find({ status: 'approved', agent_type: 'clearing' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_clearing', { layout: 'blank', agents })
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

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
    Admin.findOne({ username: username }, (err, admin) => {
        if (err) throw err;
        if (!admin) {
            return done(null, false, { message: 'Unknown User' });
        }
        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, admin);
            } else {
                return done(null, false, { message: 'Invalid Password' });
            }
        });
    });
}));
passport.serializeUser(function(Admin, done) {
    done(null, Admin.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
        done(err, admin);
    });
});


//  Login user
router.post('/auth', passport.authenticate('local', { successRedirect: '/admin/index', failureRedirect: '/admin/auth', failureFlash: true }), function(req, res) {

    res.redirect('/admin/index');

});

// router.post('/auth', passport.authenticate('local', { failureRedirect: '/admin/auth' }), async(req, res) => {
//     req.session.user = req.user
//     res.redirect('/admin/index')
// })

router.get('/add_product', async(req, res) => {
    res.render('admin/add_product_category', { layout: 'blank' })
})

//@route post /add_product
router.post('/add_product', async(req, res) => {
    try {
        await Category.create(req.body)
        res.redirect('/admin/add_product')
    } catch (err) {
        console.error(err)
        res.render('errors/500 ')

    }
})




// login out
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/admin/auth');
    });
});
module.exports = router;