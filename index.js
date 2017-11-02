'use strict';

const
  express       = require('express'),
  bodyParser    = require('body-parser'),
  app           = express().use(bodyParser.json()),
  reply         = require('./reply.js'),
  common        = require('./utils/common.js'),
  cache         = require('./session-cache.js'),
  request       = require('request'),
  config        = require('./configuration/config.json'),
  parser        = require('./parse.js');

app.listen(process.env.PORT || 1337, () => console.log('alexa-webhook is listening'));


app.post('/alexa-webhook', (req, res) => {
  let body = req.body;

  var requestObj = parser(body);
  var requestType = requestObj.requestType;
  var msg = requestObj.msg;
  var sessionId = requestObj.sessionId;

  console.log("-------================---------");
  console.log("requestType : ", JSON.stringify(requestType, null, 4));

  console.log("");
  console.log("msg : ", JSON.stringify(msg, null, 4));
  console.log("");
  console.log("-------================---------");


  cache.insertSession(sessionId, res);
  requestBotWebhook(requestObj);

});


app.post('/alexa-webhook-response', (req, res) => {

  let body = req.body;
  var alexaResponse = body.alexaResponse;
  var sessionId = body.sessionId;

  console.log("-------================---------");
  console.log("alexaResponse : ", JSON.stringify(alexaResponse, null, 4));


  var responseCallback = cache.popSessionResponse(sessionId);

  if (responseCallback) {
    responseCallback.send(alexaResponse);
    console.log("Message Sent to Alexa !");
    res.sendStatus(200);
  } else {
    console.log("Error No response callback");
    res.sendStatus(404);
  }

});


function requestBotWebhook(requestObj) {

  request({
    uri: config.BOT_WEBHOOK_URL + '/bot-webhook',
    method: 'POST',
    json: requestObj,
    headers: {
      'Content-type': 'application/json',
    },
  }, function(error, response, body) {
    if (error) {
      console.log('Error:', error);
      return;
    } else {
      console.log('Request sent to Bot-Webhook');
      return;
    }
  });
}
