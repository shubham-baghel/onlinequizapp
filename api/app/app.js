const express = require('express');
const app = express();
var db = require('./db/db');

// ADD controllers
var QuestionController = require('./routes/controllers/QuestionController');
app.use('/api/questions', QuestionController);

module.exports=app;