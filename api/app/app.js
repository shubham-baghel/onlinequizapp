const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

var db = require('./db/db');

// ADD controllers
var QuestionController = require('./routes/controllers/QuestionController');
var AccountController = require('./routes/controllers/AccountController');
var QuizController = require('./routes/controllers/QuizController');
var TagsController=require('./routes/controllers/TagsController');
var AssessmentController=require('./routes/controllers/AssessmentController');
app.use('/api/questions', QuestionController);
app.use('/api/account', AccountController);
app.use('/api/quizes', QuizController);
app.use('/api/tags',TagsController);
app.use('/api/assessment',AssessmentController);

module.exports=app;