'use strict';

const
  express       = require('express'),
  bodyParser    = require('body-parser'),
  request       = require('request'),
  config        = require('./configuration/config.json'),
  app           = express().use(bodyParser.json());


app.listen(process.env.PORT || 1337, () => console.log('bot-webhook is listening'));

app.post('/bot-webhook', (req, res) => {
  let body = req.body;

  var sessionId = body.sessionId;
  var requestType = body.requestType;
  var botResponse = body.msg;
  var responseObj = {};

  switch (requestType) {

    case "LaunchRequest":
      responseObj = {
        sessionId: sessionId,
        alexaResponse: {
          version: "string",
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: "Hi, I am happy that you are here. maverickjoy welcomes you."
            },
            reprompt: {
              outputSpeech: {
                type: "PlainText",
                text: "Would you like me to repeat"
              }
            },
            shouldEndSession: false
          }
        }
      }
      break;

    case "IntentRequest":
      responseObj = {
        sessionId: sessionId,
        alexaResponse: {
          version: "string",
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: botResponse
            },
            reprompt: {
              outputSpeech: {
                type: "PlainText",
                text: "Would you like me to repeat"
              }
            },
            shouldEndSession: false
          }
        }
      }
      break;

    case "StopRequest":
      responseObj = {
        sessionId: sessionId,
        alexaResponse: {
          version: "string",
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: "Thank You for Talking To maverickjoy. Bye"
            },
            reprompt: {
              outputSpeech: {
                type: "PlainText",
                text: "Would you like me to repeat"
              }
            },
            shouldEndSession: true
          }
        }
      }
      break;

    default:
      responseObj = {
        sessionId: sessionId,
        alexaResponse: {
          version: "string",
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: "Unknown-Type"
            },
            reprompt: {
              outputSpeech: {
                type: "PlainText",
                text: "Would you like me to repeat"
              }
            },
            shouldEndSession: false
          }
        }
      }

  }

  return responseAlexaWebhook(responseObj);

});

function responseAlexaWebhook(responseObj) {

  request({
    uri: config.ALEXA_WEBHOOK_URL + '/alexa-webhook-response',
    method: 'POST',
    json: responseObj,
    headers: {
      'Content-type': 'application/json',
    },
  }, function(error, response, body) {
    if (error) {
      console.log('Error:', error);
      return;
    } else {
      console.log('Response sent to Alexa-Webhook');
      return;
    }
  });

}
