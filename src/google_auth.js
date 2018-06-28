import { google } from 'googleapis';

/* configure a JWT auth client
   @privatekey {object/json} 驗證資料
   @apis {array}
*/
function auth(privatekey, apis) {
    let apiUrls = [];
    apis.forEach((a)=>{
        apiUrls.push('https://www.googleapis.com/auth/'+a);
    })
    const jwtClient = new google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key, 
        apiUrls);
    //authenticate request
    const promise = new Promise((resolve, reject) => {
        jwtClient.authorize(function(err, tokens) {
            if (err) reject(err);
            else resolve("Successfully connected!");
        });
    })

    //放在glob options
    google.options({
        auth: jwtClient
    });

    return promise;
}

export default auth;