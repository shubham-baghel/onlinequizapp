const mongoose = require('mongoose');  

const { Model, Schema } = mongoose;

var OptionSchema = new Schema({
  id: Number,
  o: String
});

var QuestionSchema = new mongoose.Schema({ 
  subject:String, 
  question: String,
  answers: [OptionSchema],
  options: [OptionSchema],
  tags:[String]
});

var Question = mongoose.model('Question', QuestionSchema);
var Option = mongoose.model('Option', OptionSchema);

module.exports = {
  QuestionModel : Question,
  OptionModel : Option
}