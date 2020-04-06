require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const utils = require('./utils');
const cors = require('cors');
const app = express();
const shopify = require('./my_modules/shopify');

app.use(cors(utils.corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(utils.centralErrorHandler);
app.use('/', shopify);

app.listen(utils.port, () => {
    console.log(`Server is up and running at http://localhost:${utils.port}`);
});