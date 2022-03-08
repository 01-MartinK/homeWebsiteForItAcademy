// prequisitions
const express = require('express');
const path = require('path');
const app = express();

// bodyParser Use
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'))

const http = require('http');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

// render default page
app.get('/', (req, res) => {
    res.render('index');
});

// render news page
app.get('/uudised', (req, res) => {
    res.render('news');
});

// render info page
app.get('/info', (req, res) => {
    res.render('info');
});

// render tp page
app.get('/tp', (req, res) => {
    res.render('tp');
});

// render about page
app.get('/meie', (req, res) => {
    res.render('info');
});

const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});