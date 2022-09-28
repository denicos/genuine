var express = require('express');
var router = express.Router();
const Agent = require('../models/Agent')


//Get Homepag
router.get('/', function(req, res) {
    res.render('index');
});

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

//redirect tooo 
router.get('/information', async(req, res) => {
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
    //single agent view.
router.get('/contact/:id', async(req, res) => {
    PAYMENT_URI = "https://flutterwave.com/pay/clearing"
    res.redirect(307, PAYMENT_URI)

})



module.exports = router;