var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var playercards = require('./routes/playercard');
var rankings = require('./routes/ranking');
var admin = require('./routes/admin');
var credits = require('./routes/credits');
var rules = require('./routes/rules');
var downloads = require('./routes/downloads');

require('dotenv').config();
// Init App
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set port
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.use('/', routes);
app.use('/playercard', playercards);
app.use('/rankings', rankings);
//app.use('/admin', admin);
app.use('/credits', credits);
app.use('/rules', rules);
app.use('/downloads', downloads);
