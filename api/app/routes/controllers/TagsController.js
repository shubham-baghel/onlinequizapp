var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var TagCollection=require('./../../db/models/Tag');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//GET QUIZES BY USER
router.get('/search/:search?', function (req, res) {
    if(req.params.search){
        var searchText= ".*"+req.params.search.trim().toLowerCase()+".*";
        TagCollection.find({$or:[{name: {$regex : searchText}},{ alias: {$regex : searchText}}]}, 
            function (err, tags) {
                if (err) return res.status(500).send({status:false,message:err});
                res.status(200).send({status:true,tags:tags});
            });
    }
    else{
        res.status(200).send({status:true,tags:[]});
    }
});

// CREATES/Updates A NEW QUIZ
router.post('/create', function (req, res) 
{
    console.log(req.body);
    TagCollection.create({
            name:req.body.name.trim().toLowerCase(),
            alias:(req.body.alias||[]).map((a)=>a.trim().toLowerCase()),
            createdBy:req.body.createdBy,
            createdDate:new Date()
        },
        function (err, tag) {
                if (err) return res.status(500).send({status:false,message:err});
                res.status(200).send({status:true,tag:tag});
            });
  
});

module.exports = router;