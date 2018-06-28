import http from 'http';
import https from 'https';
import fs from 'fs';
import app from './app.js';
import path from 'path';

const options = {
	key: fs.readFileSync(path.join(__dirname, '../ssl/myprivatekey.pem')),
	cert: fs.readFileSync(path.join(__dirname, '../ssl/certificate.pem'))
}

module.exports = function (config){
	if(config.server==='http'){
		const server = http.createServer(app)
		server.listen(config.PORT||3000)
	} else if(config.server==='https'){
		const server = https.createServer(options,app)
		server.listen(config.PORT||3000)
	} else {
		throw 'invalid server_type '+config.server;
		return;
	} 
	console.log(config.server+' server start at port '+(config.PORT||3000))
}