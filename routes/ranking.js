/**
 * Created by ewen.auffret on 11/2/16.
 */
var express = require('express');
var router = express.Router();

router.get('/high', function (req,res){
    res.render('ranking_high');

});

module.exports = router;