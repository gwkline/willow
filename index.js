const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 50000

const app = express();
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on ${PORT}`));



app.get('/', (req, res) => {
    res.type('.js');
    res.status(200).sendFile(path.join(__dirname, './src/index.js'));
});

app.get('/login', (req, res) => {

    res.status(200).sendFile(path.join(__dirname, './src/login.html'));
});
