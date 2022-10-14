var express = require('express');
var router = express.Router();
const Farmer = require('../models/Farmer');
const Category = require('../models/Category');

//avocados 
router.get('/avocado', async(req, res) => {
    try {
        const farmers = await Farmer.find({ product: 'avocado', status: 'approved' })
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
        const farmers = await Farmer.find({ product: 'avocado', status: 'approved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('products/avocado_view', { layout: 'general', farmers })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }

});




//banana
router.get('/banana', async(req, res) => {
    try {
        const farmers = await Farmer.find({ product: 'banana', status: 'approved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('products/banana', { layout: 'general', farmers })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }

});


router.get('/bananas', async(req, res) => {
    try {
        const farmers = await Farmer.find({ product: 'banana', status: 'approved' })
            .populate("name")
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('products/banana_view', { layout: 'general', farmers })
    } catch (err) {
        console.error(err)
        res.render('/errors/500')
    }

});

module.exports = router;