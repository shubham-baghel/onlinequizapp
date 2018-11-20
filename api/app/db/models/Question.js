var mongoose = require('mongoose');  
var Option = require('./Option');
var QuestionSchema = new mongoose.Schema({ 
  subject:String, 
  question: String,
  answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Option'}],
  options: [{type: mongoose.Schema.Types.ObjectId, ref: 'Option'}],
  tags:[String]
});
mongoose.model('Question', QuestionSchema);

module.exports = mongoose.model('Question');