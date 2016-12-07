/**
 * Created by Ewen Auffret on 27/10/2016.
 */
/**
 * Created by auffr on 24/10/2016.
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

    res.redirect('/playercard/player/' + parseInt(req.body.IDPlayer));

});
// Get Homepage
router.get('/player/:uid', function (req,res) {

    con.query('SELECT (SELECT user.Name FROM user WHERE user.PlayerID = ?) AS Username, songs.SongID, songs.Name, ' +
        'score_high_histo.Score, score_high_histo.FCSPoints, difficulty.name AS Difficulty FROM scores_high ' +
        'INNER JOIN songs ON scores_high.SongID = songs.SongID ' +
        'INNER JOIN score_high_histo ON score_high_histo.ScoreID = scores_high.ScoreID ' +
        'INNER JOIN difficulty ON  score_high_histo.DifficultyID = difficulty.id ' +
        'WHERE scores_high.PlayerID = ? ' +
        'ORDER BY songs.Name; ', [req.params.uid, req.params.uid] , function(err,rows){
        if(err) throw err;

        res.render('playercard',{
            rows: rows
        });
    });

})

module.exports = router;
