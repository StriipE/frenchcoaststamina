/**
 * Created by ewen.auffret on 12/5/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {

    res.render('rules');

});

module.exports = router;