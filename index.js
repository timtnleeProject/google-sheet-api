const valid_server_type = ['http', 'https'];
const valid_env_type = ['development','production']
const valid_port = ['port', 'PORT']


let env = 'development', server_type = 'http', port = 3000;
for(let i = 0 ; i<process.argv.length; i++) {
	if(valid_env_type.indexOf(process.argv[i]) != -1)
		env = process.argv[i]
	if(valid_server_type.indexOf(process.argv[i]) != -1)
		server_type = process.argv[i]
	if(valid_port.indexOf(process.argv[i].split('=')[0]) != -1){
		port = parseInt(process.argv[i].split('=')[1])
	}
}
const createServer = (env==='production')?require('./build/main.js'):require('./src/main.js');

const config = {
	PORT: port,
	server: server_type
}

process.env.NODE_ENV = env;
process.env.PORT = port;
console.log('start ' + config.server + ' server in '+env+' mode.')
createServer(config)