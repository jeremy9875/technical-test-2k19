'use strict';

const auth = require('ibm-watson/auth');
const fs = require('fs');
const song = require('./song');

const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const speechToText = new SpeechToTextV1({
    authenticator: new auth.IamAuthenticator({ apikey: 'X-gCzVxURpW4vTZtv2QqNGpiSeWJi4q8lK11-XtuBl4P' }),
    version: '1',
  });

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const textToSpeech = new TextToSpeechV1({
    authenticator: new auth.IamAuthenticator({ apikey: 'JxQXbdHcUTvpR-J8XN0VO7eNvByhFtdoKCYzepzhR-H7' }),
    version: '1',
  });

var functions = {
async speechtotext(turn) {
    var filename = './' + turn + '.wav';
    const params = {
        audio: fs.createReadStream(filename),
        contentType: 'audio/wav; rate=44100'
      };
      return (await speechToText.recognize(params)
        .then(response => {
          let resp = response.result.results;
          return resp;
        })
        .catch(err => {
          console.log(err);
        }));
},
texttospeech(texts, lang, turn) {
    const synthesizeParams = {
        text: texts,
        accept: 'audio/wav',
        voice: lang,
      };
      var filename = './' + turn + '.wav';
    textToSpeech
      .synthesize(synthesizeParams)
      .then(response => {
        const audio = response.result;
        audio.pipe(fs.createWriteStream(filename));
        song.uploadSong(filename);
      })
        .catch(err => {
        console.log('error:', err);
    });
    return filename;
},
}

module.exports = functions;