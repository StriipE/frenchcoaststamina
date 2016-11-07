/**
 * Created by auffr on 06/11/2016.
 */
var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var moment = require('moment');

router.get('/addScore', function(req,res) {
    res.render('add_score');
});

router.post('/addScore', function(req,res) {

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

    var FCSPoints = FCSPointsCalc(req.body.IDSong, req.body.IDDifficulty, req.body.Score);

    var score_histo = { PlayerID : req.body.IDPlayer,
                        SongID : req.body.IDSong,
                        DifficultyID: req.body.IDDifficulty,
                        Score: req.body.Score,
                        scoredOn: moment().format('YYYY-MM-DD HH:mm:ss'),
                        FCSPoints : FCSPoints};

    var insertedID = 0;

    con.query('INSERT INTO score_histo SET ? ', score_histo , function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
        insertedID = res.insertId;
        });

    con.query("SELECT SHID, FCSPoints FROM scores_high " +
        "INNER JOIN score_histo on score_histo.ScoreID = scores_high.ScoreID " +
        "WHERE scores_high.PlayerID = ? AND scores_high.SongID = ?", [req.body.IDPlayer, req.body.IDSong], function(err,res){
        if(err) throw err;

        if (res.length == 0)
        {
            for (var i = 1; i <= 10; i++)
            {
                var newRecord = { PlayerID : req.body.IDPlayer, SongID: i, ScoreID: 75}; // Null score hardcoded in base
                con.query("INSERT INTO scores_high SET ? ", newRecord, function(err,res){
                    if(err) throw err;
                });
            }

            console.log("Created score histo for player");

            con.query("UPDATE scores_high SET ScoreID = ? " +
                "WHERE PlayerID = ? AND SongID  = ? ", [insertedID, req.body.IDPlayer, req.body.IDSong], function(err,res){
                if(err) throw err;

                console.log("New record !");
            });
        }
        else {
            data = res[0];
            if(data.FCSPoints < FCSPoints)
            {
                con.query("UPDATE scores_high SET ScoreID = ? " +
                          "WHERE PlayerID = ? AND SongID  = ? ", [insertedID, req.body.IDPlayer, req.body.IDSong], function(err,res){
                    if(err) throw err;

                    console.log("New record update !");
                });
            }
        }
    });

    res.redirect('/admin/addScore');
    //updateRankings(req.body.IDPlayer, req.body.IDSong, FCSPoints);

    /*con.end(function (err) {
        if(err){
            console.log('Error while closing the connection');
            return;
        }
        console.log('Successfully disconnected to DB');


    });  */
});

/* Used to calculate FCS Points */
var FCSPointsCalc = function(songID, difficultyID, score) {

    var difficultyFactor = 0, bpm = 0;

    switch (difficultyID)
    {
        case '1':
            difficultyFactor = 0.4;
            break;
        case '2':
            difficultyFactor = 0.5;
            break;
        case '3':
            difficultyFactor = 0.65;
            break;
        case '4':
            difficultyFactor = 0.8;
            break;
        case '5':
            difficultyFactor = 1.0;
            break;
        default:
            console.log("Wrong difficulty ID");
            break;
    }

    switch (songID)
    {
        case '1':
            bpm = 150;
            break;
        case '2':
            bpm = 160;
            break;
        case '3':
            bpm = 170;
            break;
        case '4':
            bpm = 174;
            break;
        case '5':
            bpm = 180;
            break;
        case '6':
            bpm = 190;
            break;
        case '7':
            bpm = 195;
            break;
        case '8':
            bpm = 200;
            break;
        case '9':
            bpm = 210;
            break;
        case '10':
            bpm = 220;
            break;
        default :
            console.log("Wrong SongID");
            break;
    }

    var FCSPoints = (difficultyFactor * 9.09 * ((parseFloat(score) + parseFloat((bpm - 100) / 5)))).toFixed(2);

    return FCSPoints;
}

/* var updateRankings = function(playerID, songID, FCSPoints) {

    var scoreData = { PlayerID : playerID, SongID: songID};

    con.query('SELECT FCSPoints FROM scores_high' +
    'INNER JOIN score_histo on score_histo.ScoreID = scores_high.ScoreID' +
    'WHERE scores_high.PlayerID = ? AND SongID = ?', scoreData, function(err,res){
        if(err) throw err;

        console.log(res);
    });
} */

module.exports = router;