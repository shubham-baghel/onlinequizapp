var mongoose = require('mongoose');  

var {Schema} = mongoose;

let UserSchema = new mongoose.Schema({
    username : String,
    email: String,
    mobile: String,
    password : String,
    createdDate : Date,
    modifiedDate : Date,
});

var user = mongoose.model('User',UserSchema);

module.exports = user;