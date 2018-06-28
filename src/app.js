import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
//router
import router_sheet from '~/src/router/sheet';
import router_index from '~/src/router/index';

const app = express();
app.use(express.static(path.join(__dirname,'../public')));
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/' ,router_index)
//for API, all responses are JSON
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin' ,'*')
	res.header('Access-Control-Allow-Headers' ,'*')
	res.header('Content-type','application/json')
	return next()
})
app.use('/spreadsheets', router_sheet)

app.use((req,res,next)=>{
	const err = new Error()
	err.status = 404
	err.message = 'NOT FOUND'
	return next(err)
})

app.use((err,req,res,next)=> {
	res.status(err.status)
	res.end(JSON.stringify(err))
})

export default app;