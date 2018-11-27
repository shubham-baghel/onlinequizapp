const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

var db = require('./db/db');

// ADD controllers
var QuestionController = require('./routes/controllers/QuestionController');
var AccountController = require('./routes/controllers/AccountController');
app.use('/api/questions', QuestionController);
app.use('/api/account', AccountController);

module.exports=app;