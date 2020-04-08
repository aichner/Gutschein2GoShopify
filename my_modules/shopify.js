const request = require('request');

function getOrders() {
    return new Promise((resolve, reject) => {
        let apiKey = process.env.SHOPIFY_API_KEY;
        let apiPass = process.env.SHOPIFY_API_PASS;
        let shopname = 'gutschein2go';
        let apiVersion = '2020-04';
        let resource = 'orders';
        request.get(`https://${apiKey}:${apiPass}@${shopname}.myshopify.com/admin/api/${apiVersion}/${resource}.json`, (error, response, body) => {
            if (error != null) {
                reject('Error receiving orders: ' + error);
            } else {
                resolve(body);
            }
        });
    });
}

/*
function getOrders(customerID) {
    return new Promise((resolve, reject) => {
        getOrders().then((orders) => {
            let customerOrders = [];
            for(let order in orders.orders) {
                if(order.customer.id == customerID) {
                    customerOrders.push(order);
                }
            }
            resolve(customerOrders);
        }).catch((err) => {
            reject(err);
        });
    });
}
*/

module.exports.getOrders = getOrders;