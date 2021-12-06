const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { initializeApp } = require('firebase-admin/app');

var admin = require("firebase-admin");
var serviceAccount = require("./cryptoloans-82f2d-firebase-adminsdk-rmitf-22c7ceea6f.json");


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
  .get('/', (req, res) => {
    console.log("Hello World!")
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    res.render('pages/index')
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
