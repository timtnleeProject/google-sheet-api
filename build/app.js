'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sheet = require('./router/sheet');

var _sheet2 = _interopRequireDefault(_sheet);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//router
var app = (0, _express2.default)();

//bodyParser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.raw());
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', _index2.default);
//for API, all responses are JSON
app.use(function (req, res, next) {
	res.header('Content-type', 'application/json');
	return next();
});
app.use('/sheet', _sheet2.default);

app.use(function (req, res, next) {
	var err = new Error();
	err.status = 404;
	err.message = 'NOT FOUND';
	return next(err);
});

app.use(function (err, req, res, next) {
	res.status(err.status);
	res.end(JSON.stringify(err));
});

exports.default = app;