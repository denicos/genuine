var express = require('express');
var router = express.Router();

router.get('/payment_clear', async(req, res) => {
    const payment_uri = "https://flutterwave.com/pay/clearing"
    res.redirect(payment_uri);
})

router.get('/flight_payment', async(req, res) => {
    const payment = "https://flutterwave.com/pay/flight-agent"
    res.redirect(payment);
})

router.get('/payment_inspector', async(req, res) => {
    const payment = "https://flutterwave.com/pay/inspectors"
    res.redirect(payment);
})

router.get('/payment_exporter', async(req, res) => {
    const payment = "https://flutterwave.com/pay/exporters"
    res.redirect(payment);
})

router.get('/payment_space', async(req, res) => {
    const payment = "https://flutterwave.com/pay/space"
    res.redirect(payment);
})

router.get('/payment_less', async(req, res) => {
    const payment = "https://flutterwave.com/pay/less_quantity"
    res.redirect(payment);
})


router.get('/payment_excess', async(req, res) => {
    const payment = "https://flutterwave.com/pay/excess-quantity"
    res.redirect(payment);
})

router.get('/payment_farmer', async(req, res) => {
    const payment = "https://flutterwave.com/pay/farmers"
    res.redirect(payment);
})



module.exports = router;