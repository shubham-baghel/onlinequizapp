var express = require('express');
var bodyParser = require('body-parser');
var models = require('../../db/models/Question');

var Question = models.QuestionModel;
var Option = models.OptionModel;

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



// CREATES A NEW QUESTION
router.post('/', function (req, res) {

    var answers=req.body.answers.map(function(val,index){return new Option({id:val.id,o:val.o})});
    var options=req.body.options.map(function(val,index){return new Option({id:val.id,o:val.o})});
    let tags=(req.body.tags||[]).map((val,index)=>val.toUpperCase());
    let subjects=(req.body.subjects||[]).map((val,index)=>val.toUpperCase());

    Question.create({
            question : req.body.question,
            answers : answers,
            options : options,
            subjects:subjects,
            tags:tags,
            language:req.body.language,
            level:req.body.level
        }, 
        function (err, question) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            res.status(200).send(question);
        });
});

//GET QUESTIONS BY SUBJECTS
router.get('/s/(:arr)*', function (req, res) {
    var params= req.params[0].split('/');
    var paramsArray = [req.params.arr.concat(params[0])].concat(params.slice(1,params.length));

    Question.find({}, 
        function (err, questions) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            res.status(200).send(questions);
        });
});

//GET QUESTIONS BY TAGS
router.get('/t/(:arr)*', function (req, res) {
    var params= req.params[0].split('/');
    var paramsArray = [req.params.arr.concat(params[0])].concat(params.slice(1,params.length));

    Question.find({tags:{ $elemMatch: { $in: paramsArray } }}, 
        function (err, questions) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            res.status(200).send(questions);
        });
});

//GET QUESTIONS BY SUBJECTS OR TAGS
router.post('/st', function (req, res) {
    let subjects=(req.body.subjects||[]).map((val,index)=>val.toUpperCase());
    let tags=(req.body.tags||[]).map((val,index)=>val.toUpperCase());

    Question.find({ $or:[{tags:{ $elemMatch: { $in: tags }}},{subjects:{ $elemMatch: { $in: subjects }}}]}, 
        function (err, questions) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            res.status(200).send(questions);
        });
});

module.exports = router;