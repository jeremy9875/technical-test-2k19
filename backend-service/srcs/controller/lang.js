var functions = {
    getLang() {

        let dataobj = [
          "en-US_AllisonVoice",
          "pt-BR_IsabelaVoice",
          "zh-CN_WangWeiVoice",
          "zh-CN_ZhangJingVoice",
          "nl-NL_LiamVoice",
          "fr-FR_ReneeVoice",
          "ja-JP_EmiVoice",
          "ko-KR_YunaVoice",
          "es-LA_SofiaVoice",
        ];
        return dataobj[Math.floor(Math.random() * 9)]; //choix aléatoire d'une langue
      },
}

module.exports = functions;