'use strict';

var service = require('./service.js');

var controllers = {
    test: function (req, res, next) {
	try {
	    res.json('test template service');
	    next();
	}
	catch (err) {
	    next(err);
	}
	},
	  loopgametext: function (req, res, next) {
		const query = service.loopgametext(req.body.text, req.body.lang, req.body.turn);
		res.json(query);
	  },
	  loopgamespeech: function (req, res, next) {
		const query = service.loopgamespeech(req.body.voicepath, req.body.turn);
		res.json(query);
	  },
	  result_game: async function (req, res, next) {
		const query = await service.result_game();
		res.json(query);
	  },
};

module.exports = controllers;
