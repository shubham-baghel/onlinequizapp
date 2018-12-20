const mongoose = require('mongoose');  

const { Model, Schema } = mongoose;

var QuizSchema = new mongoose.Schema({ 
    name: String,
    numOfQuestions: Number,
    subjects: [String],
    tags: [String],
    language: String,
    minLevel: Number,
    quizMode:Number,
    quizDuration:Number,
    createdBy:String,
    createdDate:Date,
    modifiedBy:String,
    mdifiedDate:Date
});

var Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = {
    QuizModel : Quiz
}