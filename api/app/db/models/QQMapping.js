const mongoose = require('mongoose');  

var MappingSchema = new mongoose.Schema({ 
    quiz_id: String,
    questions_ids:[String],
    createdDate:Date,
    createdBy:String,
    modifiedDate:Date,
    modifiedBy:String
});

var QuizQuestionMapping = mongoose.model('QuizQuestionMapping', MappingSchema);

module.exports = {
    QuizQuestionMappingModel : QuizQuestionMapping
}