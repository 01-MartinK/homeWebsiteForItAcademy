// prequisitions
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const timetable = require('./public/timetable/timetable.js');
const fetch = require('node-fetch');

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

app.get('/timetable', async (req, res) => {
    res.render('timetable', {
        require: require,
        fetch: fetch
    })



});

const server = app.listen(3010, () => {
    console.log(`Express running -> PORT ${server.address().port}`)
});
