const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

let SongsSchema = new Schema({
    _id: {
        type: ObjectId
    },
    files_id: {
        type: ObjectId,
        required: true,
    },
    n: {
        type: Number,
        required: true,
    },
    data: {
        type: String,
        required: true,
    }
});

var songChunk = mongoose.model('songs.chuncks', SongsSchema);
module.exports = songChunk;