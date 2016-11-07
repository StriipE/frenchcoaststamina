/**
 * Created by Ewen Auffret on 27/10/2016.
 */
/**
 * Created by auffr on 24/10/2016.
 */
var express = require('express');
var router = express.Router();
var mysql = require("mysql");


// Get Homepage
router.get('/player/:uid', function (req,res) {
    // Mysql connection

    var con = mysql.createConnection({
        host: process.env.FCS2_DBHOST,
        user: process.env.FCS2_USER,
        password: process.env.FCS2_DBPASS,
        database: process.env.FCS2_DB
    });

    con.connect(function (err) {
        if(err){
            console.log('Error connecting to DB');
            return;
        }
        console.log('Connected to DB');
    });

    con.query('SELECT (SELECT user.Name FROM user WHERE user.PlayerID = ?) AS Username, songs.SongID, songs.Name, ' +
        'score_histo.Score, score_histo.FCSPoints, difficulty.name AS Difficulty FROM scores_high ' +
        'INNER JOIN songs ON scores_high.SongID = songs.SongID ' +
        'INNER JOIN score_histo ON score_histo.ScoreID = scores_high.ScoreID ' +
        'INNER JOIN difficulty ON  score_histo.DifficultyID = difficulty.id ' +
        'WHERE scores_high.PlayerID = ? ' +
        'ORDER BY songs.Name; ', [req.params.uid, req.params.uid] , function(err,rows){
        if(err) throw err;

        res.render('playercard',{
            rows: rows
        });
    });

    con.end(function (err) {
        if(err){
            console.log('Error while closing the connection');
            return;
        }
        console.log('Successfully disconnected to DB');
    });
})

module.exports = router;