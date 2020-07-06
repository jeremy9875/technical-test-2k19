'use strict';

var mongoose = require('mongoose');
var config = require('./config.js');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.log("Connecting to MongoDB");
mongoose.connect(config.url, {
    useNewUrlParser: true,
}).catch(error => console.log(error));

const db = mongoose.connection;

db.once('open', function () {
    console.log("MongoDB connected");
});

module.exports = db;
