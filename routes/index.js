var express = require('express');
var router = express.Router();
const Agent = require('../models/Agent')
const Product = require('../models/Product');


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
        res.redirect('/clearing')
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
//@route post /less
router.post('/less', async(req, res) => {
        try {
            await Product.create(req.body)
            res.redirect('/less')
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
//@route post /excess
router.post('/excess', async(req, res) => {
        try {
            await Product.create(req.body)
            res.redirect('/excess')
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



module.exports = router;