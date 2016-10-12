var express = require('express');
var app = express();
var router = express.Router();

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/',router);
app.use(express.static('public'));