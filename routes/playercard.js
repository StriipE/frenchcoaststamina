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

    con.query('SELECT u.Name as Username, s.Name, score FROM score ' +
    'INNER JOIN user AS u ON u.PlayerID = score.PlayerID ' +
    'INNER JOIN songs AS s ON s.SongID = score.SongID ' +
    'WHERE u.PlayerId = ? ORDER BY s.SongID;', req.params.uid, function(err,rows){
        if(err) throw err;

      //  console.log(rows);
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