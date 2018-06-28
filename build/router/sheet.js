'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _google_auth = require('../google_auth');

var _google_auth2 = _interopRequireDefault(_google_auth);

var _googleapis = require('googleapis');

var _httpErr = require('../httpErr');

var _httpErr2 = _interopRequireDefault(_httpErr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//basic authorization
router.use(function (req, res, next) {
    //valid body
    if (!req.body.client_email || !req.body.private_key) return next((0, _httpErr2.default)(403, 'request body must contain \'client_email\' and \'private_key\''));
    if (!req.body.method) return next((0, _httpErr2.default)(403, 'request body must contain \'method\', It refers to specific sheet API method'));
    if (!req.body.request) return next((0, _httpErr2.default)(403, 'request body must contain \'request\', It is sheet API options'));
    //google auth
    (0, _google_auth2.default)(req.body, ['spreadsheets']).then(function () {
        next();
    }).catch(function (e) {
        return next((0, _httpErr2.default)(403, 'google api authorization failed: ' + e.message));
    });
});

router.post('/:type', function (req, res, next) {
    var type = req.params.type;
    new Promise(function (resolve, reject) {
        if (!_googleapis.google.sheets({ version: 'v4' }).spreadsheets[type]) return reject('invalid!');
        _googleapis.google.sheets({ version: 'v4' }).spreadsheets[type][req.body.method](req.body.request, function (err, result) {
            if (err) return reject(err);else resolve(result);
        });
    }).then(function (result) {
        if (result === undefined || result.data === undefined) return new Promise.reject({ message: 'Operation failed, please check your options.' });
        var json = {
            result: result.data
        };
        res.end(JSON.stringify(json));
    }).catch(function (e) {
        return next((0, _httpErr2.default)(403, 'google sheet api failed: ' + e.message));
    });
});

exports.default = router;