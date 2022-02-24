const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var request = require('request');
const initializeApp = require('firebase-admin/app');
var admin = require("firebase-admin");

var serviceAccount = require("credentials.json");

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));



app.get('/', (req, res) => {

    res.status(200).sendFile(path.join(__dirname, './website_assets/index.html'));
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://CIS-454-Group-2.firebaseio.com'
});