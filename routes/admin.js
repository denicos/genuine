const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Agent = require('../models/Agent')
const Category = require('../models/Category')
const Admin = require('../models/Admin');
const { ensureAuth, ensureGuest, select } = require('../helpers/auth')
const Inspector = require('../models/Inspector')
const Space = require('../models/Space')
const Exporter = require('../models/Exporter')
const Product = require('../models/Product')
const Farmer = require('../models/Farmer')

//get admin index
router.get('/index', ensureAuth, function(req, res) {
    res.render('admin/admin_index', { layout: 'blank' });
});

router.get('/clear', ensureAuth, async(req, res) => {
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

router.get('/cleared', ensureAuth, async(req, res) => {
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

//flight admin section
router.get('/flight', ensureAuth, async(req, res) => {
    try {
        const agents = await Agent.find({ status: 'unapproved', agent_type: 'flight' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_flight', { layout: 'blank', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/flights', ensureAuth, async(req, res) => {
    try {
        const agents = await Agent.find({ status: 'approved', agent_type: 'flight' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_flight', { layout: 'blank', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//inspectors 
router.get('/inspector', async(req, res) => {
    try {
        const inspectors = await Inspector.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_inspector', { layout: 'blank', inspectors })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/inspectors', async(req, res) => {
    try {
        const inspectors = await Inspector.find({ status: 'approved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_inspectors', { layout: 'blank', inspectors })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});
// space un and approved
//space with AWB
router.get('/space', async(req, res) => {
    try {
        const spaces = await Space.find({ status: 'unapproved' })
            .populate("destination")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_space', { layout: 'blank', spaces })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});


router.get('/spaces', async(req, res) => {
    try {
        const spaces = await Space.find({ status: 'approved' })
            .populate("destination")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_space', { layout: 'blank', spaces })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/approve_space/:id', ensureAuth, async(req, res) => {
    try {
        const space = await Space.findOne({
            _id: req.params.id
        }).lean()
        if (!space) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_space', { layout: 'blank', space })
            console.log(space.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

router.put('/approve_space/:id', ensureAuth, async(req, res) => {

    let space = await Space.findById(req.params.id).lean()

    if (!space) {
        res.render('errors/404')
    } else {
        space = await Space.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/admin/spaces')
    }
})


// less quantity un and approved
router.get('/less', async(req, res) => {
    try {
        const products = await Product.find({ status: 'unapproved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_less', { layout: 'blank', products })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});


router.get('/lessens', async(req, res) => {
    try {
        const products = await Product.find({ status: 'approved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_less', { layout: 'blank', products })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/approve_less/:id', ensureAuth, async(req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id
        }).lean()
        if (!product) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_less', { layout: 'blank', product })
            console.log(product.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

router.put('/approve_less/:id', ensureAuth, async(req, res) => {

    let product = await Product.findById(req.params.id).lean()

    if (!product) {
        res.render('errors/404')
    } else {
        product = await Product.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/admin/lessens')
    }
})


// excess quantity un and approved
router.get('/excess', async(req, res) => {
    try {
        const products = await Product.find({ status: 'unapproved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_less', { layout: 'blank', products })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});


router.get('/exceed', async(req, res) => {
    try {
        const products = await Product.find({ status: 'approved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_less', { layout: 'blank', products })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/approve_less/:id', ensureAuth, async(req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id
        }).lean()
        if (!product) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_less', { layout: 'blank', product })
            console.log(product.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

router.put('/approve_less/:id', ensureAuth, async(req, res) => {

    let product = await Product.findById(req.params.id).lean()

    if (!product) {
        res.render('errors/404')
    } else {
        product = await Product.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/admin/lessens')
    }
})



//approve clearing agents
router.get('/approve_cleared/:id', ensureAuth, async(req, res) => {
    try {
        const agent = await Agent.findOne({
            _id: req.params.id
        }).lean()
        if (!agent) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_agent', { layout: 'blank', agent })
            console.log(agent.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

//single approve view.
//@desc update agent
//@route PUT 
router.put('/approve_cleared/:id', ensureAuth, async(req, res) => {

        let agent = await Agent.findById(req.params.id).lean()

        if (!agent) {
            res.render('errors/404')
        } else {
            agent = await Agent.findOneAndUpdate({
                _id: req.params.id
            }, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/admin/cleared')
        }
    })
    // approve flight agents
router.get('/approve_flight/:id', ensureAuth, async(req, res) => {
    try {
        const agent = await Agent.findOne({
            _id: req.params.id
        }).lean()
        if (!agent) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_flight', { layout: 'blank', agent })
            console.log(agent.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

//single approve view.
//@desc update agent
//@route PUT 
router.put('/approve_flight/:id', ensureAuth, async(req, res) => {

        let agent = await Agent.findById(req.params.id).lean()

        if (!agent) {
            res.render('errors/404')
        } else {
            agent = await Agent.findOneAndUpdate({
                _id: req.params.id
            }, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/admin/flights')
        }
    })
    //approve inspectors
router.get('/approve_inspector/:id', ensureAuth, async(req, res) => {
    try {
        const inspector = await Inspector.findOne({
            _id: req.params.id
        }).lean()
        if (!inspector) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_inspector', { layout: 'blank', inspector })
            console.log(inspector.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

router.put('/approve_inspector/:id', ensureAuth, async(req, res) => {

    let inspector = await Inspector.findById(req.params.id).lean()

    if (!inspector) {
        res.render('errors/404')
    } else {
        inspector = await Inspector.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/admin/inspectors')
    }
})




//exporter admin section
router.get('/exporter', ensureAuth, async(req, res) => {
    try {
        const exporter = await Exporter.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_exporter', { layout: 'blank', exporter })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/exporters', ensureAuth, async(req, res) => {
    try {
        const exporters = await Exporter.find({ status: 'approved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_exporter', { layout: 'blank', exporters })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/approve_exporter/:id', ensureAuth, async(req, res) => {
    try {
        const exporter = await Exporter.findOne({
            _id: req.params.id
        }).lean()
        if (!exporter) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_exporter', { layout: 'blank', exporter })
            console.log(exporter.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

router.put('/approve_exporter/:id', ensureAuth, async(req, res) => {

    let exporter = await Exporter.findById(req.params.id).lean()

    if (!exporter) {
        res.render('errors/404')
    } else {
        exporter = await Exporter.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/admin/exporters')
    }
})


// farmers un and approved
router.get('/farmer', async(req, res) => {
    try {
        const farmer = await Farmer.find({ status: 'unapproved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/unapproved_farmer', { layout: 'blank', farmer })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});


router.get('/farmers', async(req, res) => {
    try {
        const farmer = await Farmer.find({ status: 'approved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('admin/approved_farmer', { layout: 'blank', farmer })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/approve_farmer/:id', ensureAuth, async(req, res) => {
    try {
        const farmer = await Farmer.findOne({
            _id: req.params.id
        }).lean()
        if (!farmer) {
            res.render('/errors/404')
        } else {
            console.log(req.params.id)
            res.render('admin/approve_farmer', { layout: 'blank', farmer })
            console.log(farmer.status)
        }

    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
})

router.put('/approve_farmer/:id', ensureAuth, async(req, res) => {

    let farmer = await Farmer.findById(req.params.id).lean()

    if (!farmer) {
        res.render('errors/404')
    } else {
        farmer = await Farmer.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/admin/farmers')
    }
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