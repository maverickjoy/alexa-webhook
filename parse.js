'use strict';

const
  sha1 = require('sha1'),
  mongoose = require('mongoose');


function getSlotValues(slots) {
  if (!slots) return '';
  return Object.keys(slots).map(key => slots[key].value || '').join(' ');
}

module.exports = function alexaParse(messageObject) {
  if (messageObject && messageObject.session && messageObject.session.user && messageObject.session.application &&
    messageObject.session.user.userId && messageObject.request.type) {

    var textMsg = '';
    var requestTypeModification = null;

    if (messageObject.request.intent && messageObject.request.intent.name) {

      if (messageObject.request.intent.name == 'AMAZON.StopIntent')
        requestTypeModification = 'StopRequest';

      if (messageObject.request.intent.slots)
        textMsg = getSlotValues(messageObject.request.intent.slots) || '';
    }

    return {
      sender: sha1(messageObject.session.user.userId),
      applicationId: messageObject.session.application.applicationId,
      requestType: requestTypeModification ? requestTypeModification : messageObject.request.type, // LaunchRequest,IntentRequest,StopRequest;
      msg: textMsg,
      sessionId: messageObject.session.sessionId,
      originalRequest: messageObject,
      type: 'alexa-skill'
    };
  } else {
    // Defective or faulty packer received
    return {
      sender: messageObject.session.user.userId || '',
      requestType: "DEFECTIVEOBJECT",
      text: '',
      originalRequest: messageObject,
      type: 'alexa-skill'
    };
  }

};
