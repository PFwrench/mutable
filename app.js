var express = require('express');
var app = express();
var Twitter = require('node-twitter-api');

var twitter = new Twitter({
  consumerKey: 'LJED4VTgNSd8WQ0S5bAmi5pZB',
  consumerSecret: 'wye1TtPPmoGMCebWVZRK8YyM7f0g88rHmRX2uxYcsDS5YMBHrY',
  callback: 'http://localhost:8081/access-token'
});

var _requestSecret;

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/search', function(req, res) {
  res.render('search');
});

app.get('/request-token', function(req, res){
  twitter.getRequestToken(function(err, requestToken, requestSecret) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      _requestSecret = requestSecret;
      res.redirect("https://api.twitter.com/oauth/authorize?oauth_token=" + requestToken);
    }
  });
});

app.get('/access-token', function(req, res) {
  var requestToken = req.query.oauth_token;
  var verifier = req.query.oauth_verifier;

  twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.send(user);
        }
      });
    }
  });
});

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log("Listening on localhost:%s", port);
})