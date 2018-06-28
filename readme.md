# Node.js API for Google Sheet #

* This API help you make [GOOGLE SHEET API](https://developers.google.com/sheets/api/) calls. 
* [Server-to-server](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) authorization.

## Installation ##

### Install dependencies

```bash
$npm install
```

### run development server

run with `babel-node`

```bash
$npm run dev
```

### run production server

run with compiled scripts

```bash
$npm run prod
```

### options 

* **port**/**PORT** : set port. *default: 3000*
* **http**/**https**: run http/https server. *default: http*

```bash
$npm run dev https port=8080

start https server in development mode.
https server start at port 8080
```

# API #

## url

#### `{hostname}/spreadsheets/`

Refers to the API:

```js
google.sheets({ version: 'v4' }).spreadsheets
```
#### `{hostname}/spreadsheets/{resource}`

*for example* : `{hostname}/spreadsheets/values` refers to [spreadsheets.values](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values)

```js
google.sheets({ version: 'v4' }).spreadsheets.values
```

## body

#### private_key

private key of your google cloud service account.

#### client_email

email of your google cloud service account.

#### method

method of API resources.

#### request

options for API calls.

## response

**Type** : `JSON`

Google Sheet API response body.

## error response

**Type** : `JSON`

**key**

* **status** : `404`(NOT FOUND), `403`(Invalid call/authorize failed).
* **message** : error message
```json
{
  "status": 403,
  "message": "invalid api callsgoogle.sheets().values.get.get"
}
```

## Example


### *example 1: get sheet value* 

**url** 

`{hostname}/spreadsheets/values`

**body** :

```js
{
  "client_email" : <YOUR_KEY>,
  "private_key" : <YOUR_KEY>,
  "method" : "get",
  "request":{
    "spreadsheetId": <YOUR_SHEETID>,
    "range":"sheet1"
  }
}
```
Will call [spreadsheets.values.get](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get):

```js
//first authorize with your client_email and private_key
const request = //request object in your post body
google.sheets({ version: 'v4' }).spreadsheets.values.get(request ,()=>{
  //...
})
```

**response**

```js
{
    "result": {
        "range": "sheet1!A1:Z1000",
        "majorDimension": "ROWS",
        "values": [
            [
                "8/3",
                "105"
            ],
            [
                "6/5",
                "48"
            ],
            [
                "8/3",
                "105"
            ]
        ]
    }
}
```

### *example 2 : update sheet value*

**url** 

`{hostname}/spreadsheets/values`

**body** :

```js
{
  "client_email" : <YOUR_KEY>,
  "private_key" : <YOUR_KEY>,
  "method":"update",
  "request":{
    "valueInputOption":"RAW",
    "spreadsheetId": "<YOUR_SHEETID>,
    "range":"sheet1!A3:B3",
    "resource": {
      "values": [
        ["update new value","29381293789"]
      ]
    }
  }
}
```
Will call [spreadsheets.values.update](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update):

```js
//first authorize with your client_email and private_key
const request = //request object in your post body
google.sheets({ version: 'v4' }).spreadsheets.values.update(request ,()=>{
  //...
})
```

**response**

```js
{
  "result": {
    "spreadsheetId": <YOUR_SHEETID>,
    "updatedRange": "sheet1!A3:B3",
    "updatedRows": 1,
    "updatedColumns": 2,
    "updatedCells": 2
  }
}
```