const express = require('express');
const router = express.Router();
const request = require('request');

//const security = require('./securityRouter');

router.get('/orders', /*security.jwtMW,*/ (req, res) => {
    let apiKey = process.env.SHOPIFY_API_KEY;
    let apiPass = process.env.SHOPIFY_API_PASS;
    let shopname = 'gutschein2go';
    let apiVersion = '2020-04';
    let resource = 'orders';
    request.get(`https://${apiKey}:${apiPass}@${shopname}.myshopify.com/admin/api/${apiVersion}/${resource}.json`, (error, response, body) => {
        console.log(response);
        if (error != null)
            res.status(500).send(`Error receiving orders`);
        else {
            res.status(200).send(body);
        }
    });
});

module.exports = router;