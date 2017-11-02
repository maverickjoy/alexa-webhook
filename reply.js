'use strict';

module.exports = function alexaReply(botResponse, botName) {
  if (typeof botResponse === 'string' && botName)
    return {
      version: "string",
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: botResponse
        },
        reprompt: {
          outputSpeech: {
            type: "PlainText",
            text: "Would you like me to repeat",
          }
        },
        shouldEndSession: false
      }
    };

  return botResponse;
};
