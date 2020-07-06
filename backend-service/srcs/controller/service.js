'use strict';

var stringSimilarity = require('string-similarity');

const ibmApi = require('./ibm.js'); // Utilisation de la API d'ibm
var player = require('./player'); // Envois des infos de la partie en mongoDB
var langue = require('./lang'); //Choix des langues
var song = require('./song'); //Envois de la musique

var functions = { // Appel au fonction venant du controller
  loopgametext: async function (text, lang, turn) { // Boucle de jeux commençant par du texte
    var tmp = 0;

    while (turn > 0) {
      if (tmp == 0 && turn != 0) {
        await ibmApi.texttospeech(text, lang, turn); // ne crée pas de fichier
      --turn;
      tmp = 2;
      } else if (tmp == 1) {
        var text_tmp = await player.Findtext(turn);
        console.log(text_tmp.Text);
        lang = langue.getLang();
        await ibmApi.texttospeech(text_tmp.Text, lang, turn);
        --turn;
        ++tmp;
      } else if (tmp == 2) {
        let tmp_text = await ibmApi.speechtotext(turn+1);
        player.addText(tmp_text[0].alternatives[0].transcript, turn, "text");
        --turn;
        --tmp;
      }
      console.log(turn);
    }
    return 0;
  },
  loopgamespeech: async function (voicepath, turn) { // Boucle de jeux commençant par une voix
    var tmp = 0;

    while (turn > 0) {
      if (tmp == 0) {
        let tmp_text = await ibmApi.speechtotext(voicepath); // Nom du fichier audio d'exemple: exemple.wav
        player.addText(tmp_text[0].alternatives[0].transcript, turn, "voice");
        --turn;
        ++tmp;
      } else if (tmp == 1) {
        let text_tmp = await player.Findtext(turn);
        let lang = langue.getLang();
        await ibmApi.texttospeech(text_tmp.Text, lang, turn);
        --turn;
        ++tmp;
      } else if (tmp == 2) {
        let tmp_text = await ibmApi.speechtotext(turn);
        if (tmp_text != undefined)
        player.addText(tmp_text[0].alternatives[0].transcript, turn, "voice");
        --turn;
        --tmp;
      }
      console.log(turn);
    }
    return 0;
  },
  result_game: async function () { // renvois du résultat du jeux
    let params;
    let turn;
    let tmp_obj = [];
    
    let tmps = await player.getlasttext();
    if (tmps.Type == "text") {
      params = "text";
      turn = tmps.NbTour;
    } else {
      params = "voice";
      turn = tmps.NbTour++;
    }
    while (turn > 0) {
      let dataobj = {};
      if (params == "text") {
        params = "voice";
        let tmp = await player.gettext(turn);
        if (tmp != undefined)
          dataobj.textFilename = tmp.Text;
        dataobj.turn = turn;
        turn--;
      } else if (params == "voice") {
          params = "text";
          let str = await song.getSongname(turn);
        if (str != undefined)
          dataobj.textFilename = str;
        dataobj.turn = turn;
        turn--;
      }
      if (tmp_obj[0] != undefined && dataobj.textFilename != undefined) //comparation entre les deux strings
        dataobj.similarity = stringSimilarity.compareTwoStrings(dataobj.textFilename, tmp_obj[0].textFilename);
      tmp_obj.push(dataobj);
  }
    await player.dropdb(); //purge de la DB
    return tmp_obj; // return des results
  },
}

module.exports = functions;