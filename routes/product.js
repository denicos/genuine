var express = require('express');
var router = express.Router();
const Farmer = require('../models/Farmer');
const Category = require('../models/Category');

//avocados 
router.get('/avocado', async(req, res) => {
    try {
        const farmers = await Farmer.find({ product: 'avocado' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('products/avocado', { layout: 'general', farmers })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }

});


router.get('/avocados', async(req, res) => {
    try {
        const farmers = await Farmer.find({ product: 'avocado' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('products/avocado_view', { layout: 'general', farmers })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }

});

module.exports = router;