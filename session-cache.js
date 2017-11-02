'use strict'
const
  _ = require('underscore')._;

class SessionCache {
  constructor() {
    console.log("========= Session Cache Constructor =========");
    this.sessionMap = {};
  }

  insertSession(sessionId, res) {
    this.sessionMap[sessionId] = res;
  }

  popSessionResponse(sessionId) {
    var response = this.sessionMap[sessionId];
    if (response)
      this._deleteSession(sessionId);
    return response;
  }

  _deleteSession(sessionId) {
    delete this.sessionMap[sessionId];
  }

  printMapResponses() {
    _.each(this.sessionMap, function(response) {
      console.log(response);
    });
  }
}


const Singleton = (function() {
  var instance;

  return {
    getInstance: function() {
      if (!instance) {
        instance = new SessionCache();
      }
      return instance;
    },
  };
})();

module.exports = Singleton.getInstance();
