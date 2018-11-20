var mongoose = require('mongoose');  
var OptionSchema = new mongoose.Schema({  
  id: Number,
  o: String
});
mongoose.model('Option', OptionSchema);

module.exports = mongoose.model('Option');