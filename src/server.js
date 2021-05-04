const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//MIDDLEWARES
// Enable CORS
app.use(function( req, res, next ) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "1000000000");
    // intercept OPTIONS method
     if ('OPTIONS' == req.method) { res.send(200); } else { next(); } });
app.use(bodyParser.json());

//IMPORTS ROUTES
const transRoute = require('./routes/transactions');

app.use('/transactions', transRoute);

//ROUTES
app.get('/', (req, res) => 
    res.send('Server is up!'));

//CONNECT TO DB
// mongoose.connect(process.env.DB_CONNECTION2,{ useNewUrlParser: true },
//             () => console.log('Connnected to db!'));
console.log(`Server is up!`);


app.listen(3000, '0.0.0.0');
