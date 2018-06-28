'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _googleapis = require('googleapis');

/* configure a JWT auth client
   @privatekey {object/json} 驗證資料
   @apis {array}
*/
function auth(privatekey, apis) {
    var apiUrls = [];
    apis.forEach(function (a) {
        apiUrls.push('https://www.googleapis.com/auth/' + a);
    });
    var jwtClient = new _googleapis.google.auth.JWT(privatekey.client_email, null, privatekey.private_key, apiUrls);
    //authenticate request
    var promise = new Promise(function (resolve, reject) {
        jwtClient.authorize(function (err, tokens) {
            if (err) reject(err);else resolve("Successfully connected!");
        });
    });

    //放在glob options
    _googleapis.google.options({
        auth: jwtClient
    });

    return promise;
}

exports.default = auth;