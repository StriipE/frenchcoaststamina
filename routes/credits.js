/**
 * Created by auffr on 04/12/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req,res) {
    res.render('credits');
})

module.exports = router;