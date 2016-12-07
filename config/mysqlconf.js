/**
 * Created by auffr on 08/12/2016.
 */
require('dotenv').config();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.FCS2_DBHOST,
    user: process.env.FCS2_USER,
    password: process.env.FCS2_DBPASS,
    database: process.env.FCS2_DB
});

module.exports = con;