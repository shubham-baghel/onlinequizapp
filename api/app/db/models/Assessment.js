const mongoose = require('mongoose');  

var assessmentSchema = new mongoose.Schema({ 
    name: String,
    quiz_id:String,
    startTime:Date,
    endTime:Date,
    createdBy:String,
    createdDate:Date,
    modifiedBy:String,
    mdifiedDate:Date,
    attemptMode:String,//fixedattendees, variableattendees
    attendees:[String],//all attendees
    quiz_key:String//Auto generated
});

var Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;