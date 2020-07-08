const mongodb = require('mongodb');
var players = require('../model/player.model');
var songsfile = require('../model/songs.files');
var songchunk = require('../model/songs.chuncks');

var functions = {
    addText(text, turn, type) {
        var player = new players({ _id: mongodb.ObjectID(), Text: text, NbTour: turn, Type: type });
        player.save(function (err, playerone) {
        if (err) return console.error(err);
            console.log(playerone.Text + " saved to collection.");
        });
        return player;
    },
    async Findtext(turn) {
      const player = players.find({ NbTour: ++turn });
        return await player.exec().then((res, error) => {
        if (res.length > 0)
            return res[res.length-1];
          else {
            const ret = {
              Text: "filename",
            };
            return ret;
          }
        })
      },
    async dropdb() {
        players.collection.drop();
        /*songchunk.collection.drop();
        songsfile.collection.drop();*/
        return 0;
    },
    async gettext(turn) {
      const player = players.find({ NbTour: turn });
        return await player.exec().then((res, error) => {
        if (res.length > 0)
            return res[res.length-1];
          else {
            const ret = {
              Text: "filename",
            };
            return ret;
          }
        })
    },
    async getlasttext() {
      const player = players.find({}).sort().limit(1);
        return await player.exec().then((res, error) => {
        if (res.length > 0)
            return res[res.length-1];
          else {
            const ret = {
              Text: "error",
            };
            return ret;
          }
        })
    },
}

module.exports = functions;