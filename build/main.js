'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
	key: _fs2.default.readFileSync(_path2.default.join(__dirname, '../ssl/myprivatekey.pem')),
	cert: _fs2.default.readFileSync(_path2.default.join(__dirname, '../ssl/certificate.pem'))
};

module.exports = function (config) {
	if (config.server === 'http') {
		var server = _http2.default.createServer(_app2.default);
		server.listen(config.PORT || 3000);
	} else if (config.server === 'https') {
		var _server = _https2.default.createServer(options, _app2.default);
		_server.listen(config.PORT || 3000);
	} else {
		throw 'invalid server_type ' + config.server;
		return;
	}
	console.log(config.server + ' server start at port ' + (config.PORT || 3000));
};