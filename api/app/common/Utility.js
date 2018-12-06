const jwt = require('jsonwebtoken');

var Utility = {
    generateToken : function(user){
        var u = {
            username: user.username,
           };

           return token = jwt.sign(u, "SECRETKEY", {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
         });
    }
}

module.exports = Utility;