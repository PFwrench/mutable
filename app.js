var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
})

var server = app.listen(8081, function () {
  var port = server.address().port;
  console.log("Listening at localhost:%s", port);

  app.get('/', function(req, res) {
    console.log("Getting homepage");
  })
})