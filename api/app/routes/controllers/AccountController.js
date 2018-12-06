var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../db/models/User');
var util = require('../../common/Utility');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/login",function (req, res) {
    const { username, password } = req.body;
    User.findOne({'email' :username}).exec(function (err, user) {
        if (err) {
        return res.status(500).send("Error :"+JSON.stringify(err));
        }

        if(!user){
            return res.status(500).json({
                error: true,
                message: 'Username or Password is Wrong'
              });
        }
        
        bcrypt.compare(password,user.password,
            function(err, valid) {
                if(!valid){
                    return res.status(404).json({
                        error : true,
                        message :'Username or Password is Wrong'
                    })
                }
                else{
                    var token = util.generateToken(user); 
                    console.log(token);
                    return res.json({
                            sucess: true,
                            err: null,
                            user,
                            token
                        });
                }
            })
    })
})

router.post("/signUp", function(req, res) {

    let hash = bcrypt.hashSync(req.body.password.trim(), 10);
    User.create({
        username : req.body.username,
        password : hash,
        email : req.body.email,
        mobile : req.body.mobile,
        createdDate : new Date(),
        modifiedDate : new Date()
            },function(err, user) {
                if(err) return  res.status(500).send("Error :"+JSON.stringify(err));
                let token = util.generateToken(user);
                res.status(200).json({ user : user,token : token}); 
            })

})

module.exports = router;