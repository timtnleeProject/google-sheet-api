import express from 'express';
import auth from '~/src/google_auth';
import { google } from 'googleapis';
import httpErr from '~/src/httpErr';

const router = express.Router();


//basic authorization
router.use((req, res, next) => {
    if(req.method==='OPTIONS') return res.end();//for ajax call OPTION
    if(req.method!=='POST') return next();
    //valid body
    if (!req.body.client_email || !req.body.private_key) return next(httpErr(403, 'request body must contain \'client_email\' and \'private_key\''))
    //google auth
    auth(req.body, ['spreadsheets'])
        .then(() => {
            next()
        })
        .catch((e) => {
            return next(httpErr(403, 'google api authorization failed: ' + e.message));
        })
})

router.post('/*/?',(req, res, next) => {
    //valid body
    if (!req.body.method) return next(httpErr(403, 'request body must contain \'method\', It refers to specific sheet API method'))
    if (!req.body.request) return next(httpErr(403, 'request body must contain \'request\', It is sheet API options'))
    //valid api call
    let api = google.sheets({ version: 'v4' }).spreadsheets;
    let strs = 'google.sheets()'
    const atrs = req.path.split('/');
    for(let i=1;i<atrs.length;i++) {
        if(!atrs[i]) break;
        strs+='.'+atrs[i];
        if(!api[atrs[i]]) return next(httpErr(403, 'Invalid api calls'+strs));
        api = api[atrs[i]]; 
    }
    if(!api[req.body.method]) return next(httpErr(403, 'Invalid api mathod'+strs+'.'+req.body.method));
    
    //api call
    new Promise((resolve, reject) => {
            api[req.body.method](req.body.request, (err, result) => {
                if (err) return reject(err);
                else resolve(result)
            });
        })
        .then((result) => {
        	if(result===undefined||result.data===undefined) return new Promise.reject({message:'Operation failed, please check your options.'})
            const json = {
                result: result.data
            }
            res.end(JSON.stringify(json))
        })
        .catch((e) => {
            return next(httpErr(403, 'google sheet api \''+strs+'.'+req.body.method+'\' failed: ' + e.message));
        })
})

export default router;