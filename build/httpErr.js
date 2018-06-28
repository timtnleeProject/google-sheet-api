"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (status, message) {
	var err = new Error();
	err.status = status;
	err.message = message;
	return err;
};