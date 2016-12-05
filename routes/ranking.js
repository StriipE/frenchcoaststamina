/**
 * Created by ewen.auffret on 11/2/16.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/high', function (req,res){

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

    con.query('SELECT user.Name, user.CountryCode, COUNT(*) AS Played, ROUND(SUM(score_high_histo.FCSPoints),2) AS Score from scores_high ' +
              'INNER JOIN score_high_histo ON score_high_histo.ScoreID = scores_high.ScoreID ' +
              'INNER JOIN user ON user.PlayerID = scores_high.PlayerID ' +
              'WHERE score_high_histo.ScoreID != 1 ' +
              'GROUP BY scores_high.PlayerID ORDER BY Score DESC', function(err,rows){
        if(err) throw err;

        var rank = 1;
        var newRows = rows;
        for (row in newRows) {
            newRows[row]['Rank'] = rank;
            rank++;
        }

        res.render('ranking_high',{
            rows: newRows
        });
    });

    con.end(function (err) {
        if(err){
            console.log('Error while closing the connection');
            return;
        }
        console.log('Successfully disconnected to DB');
    });
});

router.get('/low', function (req,res){

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

    con.query('SELECT user.Name, user.CountryCode, COUNT(*) AS Played, SUM(Fantastics) AS Fantastics, SUM(Excellents) AS Excellents, ' +
        'SUM(Greats) AS Greats, SUM(FCSPoints) AS Score from scores_low ' +
        'INNER JOIN score_low_optional_histo ON score_low_optional_histo.ScoreID = scores_low.ScoreID ' +
        'INNER JOIN user ON user.PlayerID = scores_low.PlayerID ' +
        'WHERE score_low_optional_histo.ScoreID != 1 ' +
        'GROUP BY score_low_optional_histo.PlayerID ORDER BY Score DESC', function(err,rows){
        if(err) throw err;

        var rank = 1;
        var newRows = rows;
        for (row in newRows) {
            newRows[row]['Rank'] = rank;
            rank++;
        }

        res.render('ranking_low',{
            rows: newRows
        });
    });

    con.end(function (err) {
        if(err){
            console.log('Error while closing the connection');
            return;
        }
        console.log('Successfully disconnected to DB');
    });
});
module.exports = router;
