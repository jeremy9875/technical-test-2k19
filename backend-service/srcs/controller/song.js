const fs = require('fs');
const assert = require('assert');
const mongodb = require('mongodb');

var database = require('../database/database.js');

var functions = {
    uploadSong(filename) {
        var bucket = new mongodb.GridFSBucket(database.db, {
          chunkSizeBytes: 1024,
          bucketName: 'songs'
          });
        fs.createReadStream(filename).
          pipe(bucket.openUploadStream(filename)).
          on('error', function(error) {
            assert.ifError(error);
          }).
              on('finish', function() {
                console.log('done!');
              });
          return null;
      },
      getSong(filename) {
          const bucket = new mongodb.GridFSBucket(database.db, {
              chunkSizeBytes: 1024,
              bucketName: 'songs'
            });
            bucket.openDownloadStreamByName(filename).
              pipe(fs.createWriteStream(filename)).
              on('error', function(error) {
                assert.ifError(error);
              }).
              on('finish', function() {
                console.log('done!');
              });
          return null;
      },
      async getSongname(turn) {
        var filename = './' + turn + '.wav';
        //this.getSong(filename);
      
        return await filename;
      },
}

module.exports = functions;