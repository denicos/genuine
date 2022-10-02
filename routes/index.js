var express = require('express');
var router = express.Router();
const Agent = require('../models/Agent')
const Product = require('../models/Product');
const Inspector = require('../models/Inspector')
const Space = require('../models/Space');
const Exporter = require('../models/Exporter');


//Get Homepag
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/payment', async(req, res) => {
    const payment_uri = "https://flutterwave.com/pay/clearing"
    res.redirect(payment_uri);
})

//Get clearing agent view
router.get('/clearing', async(req, res) => {
    try {
        const agents = await Agent.find({ agent_type: 'clearing' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('clearing_agents', { layout: 'general', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//get clearing dummy
router.get('/clearings', async(req, res) => {
    try {
        const agents = await Agent.find({ agent_type: 'clearing' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('clearing_pay', { layout: 'general', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//@desc process add clearing agent form
//@route post /clearing
router.post('/clearing', async(req, res) => {
    try {
        await Agent.create(req.body)
        res.redirect('/clearings')
    } catch (err) {
        console.error(err)
        res.render('errors/500 ')
    }
})


//process flight agents
//Get clearing agent view
router.get('/flight', async(req, res) => {

    try {
        const agents = await Agent.find({ agent_type: 'flight' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('flight_agent', { layout: 'general', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//Get clearing agent view
router.get('/flights', async(req, res) => {

    try {
        const agents = await Agent.find({ agent_type: 'flight' })
            .populate("agent_type")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('pay_flight', { layout: 'general', agents })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//@desc process add flight agent form
//@route post /flight
router.post('/flight', async(req, res) => {
    try {
        await Agent.create(req.body)
        res.redirect('/flight')
    } catch (err) {
        console.error(err)
        res.render('errors/500 ')

    }
})

//single agent view.
router.get('/contact/:id', async(req, res, next) => {
    const agent = await Agent.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()
    if (!agent) {
        return res.render('errors/404')
    } else {

        res.render('full_agent_info', { layout: 'general', agent })


    }

})

//quantity less by
router.get('/less', async(req, res) => {
    try {
        const products = await Product.find({ quantity_type: 'less' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('less', { layout: 'general', products })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/lezz', async(req, res) => {
    try {
        const products = await Product.find({ quantity_type: 'less' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('pay_less', { layout: 'general', products })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});
//@route post /less
router.post('/less', async(req, res) => {
        try {
            await Product.create(req.body)
            res.redirect('/lezz')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single  less
router.get('/less/:id', async(req, res) => {
    const les = await Product.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!les) {
        return res.render('errors/404')
    } else {
        res.render('view_less', { layout: 'general', les })
    }
})

//quantity excess by
router.get('/excess', async(req, res) => {
    try {
        const productz = await Product.find({ quantity_type: 'excess' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('excess', { layout: 'general', productz })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//DUMMY EXCESS
//quantity excess by
router.get('/excezz', async(req, res) => {
    try {
        const productz = await Product.find({ quantity_type: 'excess' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('pay_excess', { layout: 'general', productz })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//@route post /excess
router.post('/excess', async(req, res) => {
        try {
            await Product.create(req.body)
            res.redirect('/excezz')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single  excess
router.get('/excess/:id', async(req, res) => {
    const excess = await Product.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!excess) {
        return res.render('errors/404')
    } else {
        res.render('view_excess', { layout: 'general', excess })
    }
})


//inspector route.
//get inspector page
router.get('/inspector', async(req, res) => {
    try {
        const inspectors = await Inspector.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('inspector', { layout: 'general', inspectors })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

router.get('/inspectors', async(req, res) => {
    try {
        const inspectors = await Inspector.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('pay_inspector', { layout: 'general', inspectors })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});


//@route post /inspector
router.post('/inspector', async(req, res) => {
        try {
            await Inspector.create(req.body)
            res.redirect('/inspectors')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single inspector
router.get('/inspector/:id', async(req, res) => {
    const inspector = await Inspector.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!inspector) {
        return res.render('errors/404')
    } else {
        res.render('view_inspector', { layout: 'general', inspector })
    }
})


//space with AWB
router.get('/space', async(req, res) => {
    try {
        const spaces = await Space.find({ status: 'unapproved' })
            .populate("country")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('space', { layout: 'general', spaces })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//dummy space
router.get('/spaces', async(req, res) => {
    try {
        const spaces = await Space.find({ status: 'unapproved' })
            .populate("country")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('pay_space', { layout: 'general', spaces })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});
//@route post /space
router.post('/space', async(req, res) => {
        try {
            await Space.create(req.body)
            res.redirect('/spaces')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single  space
router.get('/space/:id', async(req, res) => {
    const spaces = await Space.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!spaces) {
        return res.render('errors/404')
    } else {
        res.render('view_space', { layout: 'general', spaces })
    }
})


//get exporter page..
router.get('/exporter', async(req, res) => {
    try {
        const exporters = await Exporter.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('exporters', { layout: 'general', exporters })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//dummy
router.get('/exporters', async(req, res) => {
    try {
        const exporters = await Exporter.find({ status: 'unapproved' })
            .populate("status")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('pay_exporters', { layout: 'general', exporters })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }
});

//@route post /exporter
router.post('/exporter', async(req, res) => {
        try {
            await Exporter.create(req.body)
            res.redirect('/exporter')
        } catch (err) {
            console.error(err)
            res.render('errors/500 ')

        }
    })
    //single exporter
router.get('/exporter/:id', async(req, res) => {
    const exporter = await Exporter.findOne({
            _id: req.params.id
        })
        .populate("_id")
        .lean()

    if (!exporter) {
        return res.render('errors/404')
    } else {
        res.render('view_exporter', { layout: 'general', exporter })
    }
})


module.exports = router;