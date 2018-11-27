var express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let users = [
    {
        id: 1,
        username: 'test',
        password: 'test'
    },
    {
        id: 2,
        username: 'test2',
        password: 'test2'
    }
];

router.post("/login",function (req, res) {
    const { username, password } = req.body;
    // Use your DB ORM logic here to find user and compare password
    for (let user of users) { // I am using a simple array users which i made above
        if (username == user.username && password == user.password /* Use your password hash checking logic here !*/) {
            //If all credentials are correct do this
            let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
            console.log(token);
            
            res.json({
                sucess: true,
                err: null,
                token
            });
            break;
        }
        else {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    }
})

module.exports = router;