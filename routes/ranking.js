/**
 * Created by ewen.auffret on 11/2/16.
 */
var express = require('express');
var con = require('../config/mysqlconf');
var router = express.Router();

router.get('/high', function (req,res){

    con.query('SELECT user.PlayerID, user.Name, user.CountryCode, COUNT(*) AS Played, ROUND(SUM(score_high_histo.FCSPoints),2) AS Score from scores_high ' +
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

});

router.get('/low', function (req,res){

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

});

module.exports = router;
