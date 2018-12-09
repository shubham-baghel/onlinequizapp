var express = require('express');
var bodyParser = require('body-parser');
var models = require('../../db/models/Quiz');

var Quiz = models.QuizModel;

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



// CREATES A NEW QUIZ
router.post('/', function (req, res) {
    Quiz.create({
        name: req.body.name,
        numOfQuestions: req.body.numOfQuestions,
        subjects: req.body.subjects,
        tags: req.body.tags,
        language: req.body.language,
        minLevel: req.body.minLevel,
        quizMode:req.body.quizMode,
        createdBy:req.body.createdBy,
        createdDate:new Date()
        }, 
        function (err, quiz) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            res.status(200).send(quiz);
        });
});

//GET QUIZES BY USER
router.get('/u/(:arr)*', function (req, res) {
    var params= req.params[0].split('/');
    var paramsArray = [req.params.arr.concat(params[0])].concat(params.slice(1,params.length));

    Quiz.find({}, 
        function (err, quizes) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            res.status(200).send(quizes);
        });
});

module.exports = router;