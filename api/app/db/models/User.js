var mongoose = require('mongoose');  

var {Schema} = mongoose;

let UserSchema = new mongoose.Schema({
    email: String,
    mobile: String,
    password : String,
    CreatedDate : Date,
    CreatedBy : String
});

var user = mongoose.model('User',UserSchema);

module.exports = user;