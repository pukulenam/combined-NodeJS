var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/",function(req,res){
    console.log("Hello i'm on the start page here");
    res.render("index")
});

router.get("/abstract",function(req,res){
    console.log("Abstract Page");
    res.render("abstract")
});

router.get("/convert",function(req,res){
    console.log("convert page");
    res.render("convert")
});

router.get("/t5",function(req,res){
    console.log("t5 Tokenization page");
    res.render("t5")
});
router.get("/mksa",function(req,res){
    console.log("MKSA Page");
    res.render("mksa")
});

router.get("/newsscrapper",function(req,res){
    console.log("Newsscrapper Page");
    res.render("newsscrapper")
});

module.exports = router;