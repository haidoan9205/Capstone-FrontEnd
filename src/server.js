const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('connect');
require('dotenv/config');

//MIDDLEWARES
// Enable CORS
app.use(cors());
app.use(bodyParser.json());

//IMPORTS ROUTES
const transRoute = require('./routes/transactions');

app.use('/transactions', transRoute);

//ROUTES
app.get('/', (req, res) => 
    res.send('Server is up!'));

//CONNECT TO DB
// mongoose.connect(process.env.DB_CONNECTION2,{ useNewUrlParser: true },
//             () => ('Connnected to db!'));
(`Server is up!`);


app.listen(3000);

