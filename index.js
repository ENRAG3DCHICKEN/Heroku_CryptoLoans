const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./cryptoloans-82f2d-firebase-adminsdk-rmitf-22c7ceea6f.json");

const twilio = require('twilio');



const axios = require("axios");


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
        'X-CMC_PRO_API_KEY': 'a3647fe0-fec6-47b5-8e13-e1758053cb89'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    
    
    console.log("end")
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
