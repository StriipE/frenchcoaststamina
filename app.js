var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var routes = require('./routes/index');
var playercards = require('./routes/playercard');
var rankings = require('./routes/ranking');

require('dotenv').config();
// Init App
var app = express();

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