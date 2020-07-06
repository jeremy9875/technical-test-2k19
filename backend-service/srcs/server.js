// REQUIRE
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./api/routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// CONFIG UPHILL
dotenv.config();

// DECLARATION
const port = process.env.PORT || 4243;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// CORE Headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

//MIDDLEWARE
app.use(morgan('status :method :url :response-time ms - :res[content-length]'));

// CONFIG DOWNSTREAM
routes(app);

app.listen(port, function () {
    console.log('Service started on port :', port);
    console.log('Environment :', process.env.NODE_ENV);
});
