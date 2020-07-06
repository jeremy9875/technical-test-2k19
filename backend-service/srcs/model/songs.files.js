const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

let SongsSchema = new Schema({
    _id: {
        type: ObjectId
    },
    length: {
        type: Number,
        required: true,
    },
    chunkSize: {
        type: Number,
        required: true,
    },
    uploadDate: {
        type: Date,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    md5: {
        type: String,
        required: true,
    }
});

var songFile = mongoose.model('songs.files', SongsSchema);
module.exports = songFile;