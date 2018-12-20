var express = require('express');
var bodyParser = require('body-parser');
var models = require('../../db/models/Quiz');
var qqModel = require('../../db/models/QQMapping');
var QuizQuestionMappingModel=qqModel.QuizQuestionMappingModel;
var Quiz = models.QuizModel;
var models = require('../../db/models/Question');
var QuestionModel = models.QuestionModel;
var router = express.Router();
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



// CREATES/Updates A NEW QUIZ
router.post('/', function (req, res) 
{
    console.log(req.body);
    let quiz=new Quiz({
        name: req.body.name,
        numOfQuestions: req.body.numOfQuestions,
        subjects: req.body.subjects,
        tags: req.body.tags,
        language: req.body.language,
        minLevel: req.body.minLevel||0,
        quizMode:req.body.quizMode||0,
        quizDuration:req.body.quizDuration||0,
        createdBy:req.body.createdBy,
        createdDate:new Date(),
        modifiedBy:req.body.modifiedBy,
        modifiedDate:new Date()});

    if(req.body._id && req.body._id!=null && req.body._id!='') 
    {
        Quiz.update({_id:req.body._id},quiz,{upsert:true},
            function (err, quiz) {
                if (err) return res.status(500).send("Error :"+JSON.stringify(err));
                res.status(200).send(quiz);
            });
    }else{
        Quiz.create(quiz,
            function (err, quiz) {
                if (err) return res.status(500).send("Error :"+JSON.stringify(err));
                res.status(200).send(quiz);
            });
    }
  
});

// CREATES/Update A NEW QUIZ-QUESTIONS MAPPING
router.post('/map', function (req, res) {
    QuizQuestionMappingModel.find({quiz_id:req.body.quiz_id}, 
        function (err, mapping) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            if(mapping)
            {
                let updatequestions_ids=req.body.questions_ids||[];
                // let newquestions_ids=(req.body.questions_ids||[]).filter((q)=>!(mapping.questions_ids||[]).includes(q));
                // let updatequestions_ids=(mapping.questions_ids||[]).concat(newquestions_ids);

                QuizQuestionMappingModel.update({quiz_id:req.body.quiz_id},
                    {$set:{
                    questions_ids:updatequestions_ids,
                    modifiedDate:new Date(),
                    modifiedBy:req.body.modifiedBy
                }},
                {upsert:true}, function(err, quizmapping){
                    if (err) return res.send(500, { error: err });
                    return res.send(quizmapping);
                });
            }else{
                QuizQuestionMappingModel.create({
                    quiz_id:req.body.quiz_id,
                    questions_ids:req.body.questions_ids,
                    createdBy:req.body.createdBy,
                    createdDate:new Date()
                    }, 
                    function (err, quizmapping) {
                        if (err) return res.status(500).send("Error :"+JSON.stringify(err));
                        res.status(200).send(quizmapping);
                    });
            }
        });
    
});

// GET QUIZ Detail BY QUIZ ID
router.get('/detail/:qzid', function (req, res) {
    var qzid= req.params.qzid;
    Quiz.find({_id:qzid}, 
        function (err, quiz) {
            if (err) return res.status(500).send("Error :"+JSON.stringify(err));
            QuizQuestionMappingModel.find({quiz_id :qzid},
                function (err, mapping) {
                    if (err) return res.status(500).send("Error :"+JSON.stringify(err));
                    if((mapping.length>0 && mapping[0].questions_ids||[]).length>0)
                    {
                        QuestionModel.find({_id: { $in: (mapping[0].questions_ids||[]) }}, function (err, questions) {
                            if (err) return res.status(500).send("Error :"+JSON.stringify(err)); 
                            res.status(200).send({quiz:quiz[0],questions:questions});
                        });
                    }else{
                        res.status(200).send({quiz:quiz[0],questions:[]});
                    }
                });
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