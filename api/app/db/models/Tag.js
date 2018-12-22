var mongoose = require('mongoose');  

let TagsSchema = new mongoose.Schema({
    name : String,
    alias:[String],
    createdBy:String,
    createdDate : Date
});

var tag = mongoose.model('Tag',TagsSchema);

module.exports = tag;