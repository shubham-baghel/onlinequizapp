var express = require('express');
var bodyParser = require('body-parser');
var Assessment = require('../../db/models/Assessment');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Create assessment
router.post('/create', function (req, res) 
{
    Assessment.create({
        name:req.body.name,
        quiz_id:req.body.quiz_id,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        createBy:req.body.createBy,
        createdDate:new Date(),
        quiz_key:"T3ST",//will be generated automatically
        attemptMode:req.body.attemptMode||"variableattendees",
        attendees:[]//will be added while attempt the quiz or by Assessment owner
    },function(err, assessment){
        if (err) return res.status(500).send("Error :"+JSON.stringify(err));
        return res.status(500).send(assessment);
     });
});

module.exports = router;
