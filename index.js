let express = import('express')
let path = import('path')
let PORT = process.env.PORT || 50000

let app = express();


import React from 'react';
import ReactDOM from 'react-dom';
import './src/Dash/index.css';
import App from './src/Dash/App.js';


app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));







app.get('/', (req, res) => {
    ReactDOM.render(App, document.getElementById('root'));
    //res.sendFile(path.join(__dirname, './src/Dash/index.html'));
});

app.get('/login', (req, res) => {

    res.status(200).sendFile(path.join(__dirname, './src/Login/login.html'));
});

app.get('/login_test', (req, res) => {

    res.status(200).sendFile(path.join(__dirname, './src/Login/login_test.html'));
});