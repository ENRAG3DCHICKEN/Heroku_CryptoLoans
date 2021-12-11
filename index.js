const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./cryptoloans-82f2d-firebase-adminsdk-rmitf-22c7ceea6f.json");

const twilio = require('twilio');

require("dotenv").config()


const axios = require("axios");
const { callbackify } = require('util');



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    console.log("Hello World!")
      initializeApp({
      credential: cert(serviceAccount)
    });
    const db = getFirestore();
    res.render('pages/index')
  })  
  .get('/test', (req, res) => {
    console.log("Testing 123!")
    axios.get("https://reqres.in/api/users")
      .then(response => 
        res.json(response.data)
      )
  })
  .get('/quotefromcmc', (req, res) => {
    
    console.log("Testing CMC Route!")

    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'http://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=eth,btc',
      'headers': {
        'X-CMC_PRO_API_KEY': process.env.X_CMC_PRO_API_KEY
      }
    };

    axios(options)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
    console.log("end")
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
