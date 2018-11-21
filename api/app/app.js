const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

var db = require('./db/db');

// ADD controllers
var QuestionController = require('./routes/controllers/QuestionController');
app.use('/api/questions', QuestionController);

module.exports=app;