const express = require('express');
const router = express.Router();
const shopify = require('./shopify');
const pdf = require('./pdfcreation');

//const security = require('./securityRouter');

router.get('/orders', /*security.jwtMW,*/(req, res) => {
    shopify.getOrders().then((orders) => {
        res.status(200).send(orders);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.post('/getCoupon', (req, res) => {
    pdf.getCoupon(req, res);
});

module.exports = router;