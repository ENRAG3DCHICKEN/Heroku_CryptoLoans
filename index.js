const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./cryptoloans-82f2d-firebase-adminsdk-rmitf-22c7ceea6f.json");

const twilio = require('twilio');



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
  .get('/retrievecryptoprices', (req, res) => {
    console.log("retrieving crypto prices")

    

  })


  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
