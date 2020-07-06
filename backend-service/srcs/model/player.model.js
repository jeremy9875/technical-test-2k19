const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    _id: {
        type: ObjectId,
    },
    Text: {
        type: String,
        required: true,
    },
    NbTour: {
        type: Number,
        required: true,
    },
    Type: {
        type: String,
        required: true,
    }
});

var player = mongoose.model('players', PlayerSchema);
module.exports = player;