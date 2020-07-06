'use strict';

var controller = require('../controller/controller.js');
var service = require('../controller/service.js');

module.exports = function (app) {
    app.route('/test')
        .get(controller.test);
    app.route('/loopgametext')
        .post(controller.loopgametext);
    app.route('/loopgamespeech')
        .post(controller.loopgamespeech);
    app.route('/result_game')
        .get(controller.result_game);
};
