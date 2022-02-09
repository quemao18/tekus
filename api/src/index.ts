import { Application, Request, Response } from 'express'
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const app: Application = express();

const port: number = 3001

// Parse Query String
app.use(bodyParser.urlencoded({ extended: false }));

// Parse posted JSON body
app.use(bodyParser.json());

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Tekus')
})

app.get('/btc', (req: Request, res: Response) => {    
    var result = request('https://api.coinbase.com/v2/prices/BTC-USD/spot?date='+req.query.date, 
    function (error: any, response: any, body: any) {  
        if(error) res.send({error: error, message: 'Error api coinbase...'});
        res.send(body);
    });
    result.on('error', function(error:any){
        res.send({error: error, message: 'Error in request'});
    })
})

app.listen(port, function () {
    console.log(`¡App is listening on port ${port}!`)
})