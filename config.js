const configs = {};

configs.dev = {
	PORT: 3000,
	NODE_ENV: 'developement',
	server:'http'
}

configs.prod = {
	PORT: 3005,
	NODE_ENV: 'production',
	server:'https'
}

module.exports = configs;