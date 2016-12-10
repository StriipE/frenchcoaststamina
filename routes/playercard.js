/**
 * Created by Ewen Auffret on 27/10/2016.
 */

var express = require('express');
var con = require('../config/mysqlconf');
var router = express.Router();

router.get('/', function(req,res) {

    var players;

    con.query("SELECT PlayerID, Name FROM user", [], function(err,rows) {
        if (err) throw err;

        players = rows;
        res.render('playercard_select', { players: players });
    });
});

router.post('/cardrouter', function (req,res) {

    if (req.body.division === 'High')
        res.redirect('/playercard/player/high/' + parseInt(req.body.IDPlayer));
    else
        res.redirect('/playercard/player/low/' + parseInt(req.body.IDPlayer));
});
// Get Homepage
router.get('/player/high/:uid', function (req, res) {

    con.query('SELECT (SELECT user.Name FROM user WHERE user.PlayerID = ?) AS Username, songs.SongID, songs.Name, ' +
        'score_high_histo.Score, score_high_histo.FCSPoints, difficulty.name AS Difficulty FROM scores_high ' +
        'INNER JOIN songs ON scores_high.SongID = songs.SongID ' +
        'INNER JOIN score_high_histo ON score_high_histo.ScoreID = scores_high.ScoreID ' +
        'INNER JOIN difficulty ON  score_high_histo.DifficultyID = difficulty.id ' +
        'WHERE scores_high.PlayerID = ? ' +
        'ORDER BY songs.Name; ', [req.params.uid, req.params.uid], function (err, rows) {
            if (err) throw err;

            res.render('playercard_high', {
                rows: rows
            });
        });

});

router.get('/player/low/:uid', function (req, res) {

    con.query('SELECT (SELECT user.Name FROM user WHERE user.PlayerID = ?) AS Username, songs.SongID, songs.Name, ' +
        'score_low_optional_histo.Fantastics, score_low_optional_histo.Excellents, score_low_optional_histo.Greats, ' +
        'score_low_optional_histo.FCSPoints FROM scores_low ' +
        'INNER JOIN songs ON scores_low.SongID = songs.SongID ' +
        'INNER JOIN score_low_optional_histo ON score_low_optional_histo.ScoreID = scores_low.ScoreID ' +
        'WHERE scores_low.PlayerID = ? ' +
        'ORDER BY SongID; ', [req.params.uid, req.params.uid], function (err, rows) {
            if (err) throw err;

            res.render('playercard_low', {
                rows: rows
            });
        });

});

module.exports = router;
