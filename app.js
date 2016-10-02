var express = require('express');
var app = express();
var Twitter = require('node-twitter-api');
var http = require('http');
http.post = require('http-post');

var twitter = new Twitter({
  consumerKey: 'LJED4VTgNSd8WQ0S5bAmi5pZB',
  consumerSecret: 'wye1TtPPmoGMCebWVZRK8YyM7f0g88rHmRX2uxYcsDS5YMBHrY',
  callback: 'http://getmuted.com/access-token'
});

var _requestSecret;
var _accessToken;
var _accessSecret;

var optionsToMute;

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
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
      _accessToken = accessToken;
      _accessSecret = accessSecret;
      twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          twitter.friends('list', {
            count: 200,
            skip_status: true,
            include_user_entities: false
          },
          accessToken,
          accessSecret,
          function(error, data, response) {
            optionsToMute = data.users;
            res.redirect('/search');
          });
        }
      });
    }
  });
});

app.get('/search', function(req, res) {
  res.render('search', {results: optionsToMute});
});

app.get('/prepare-data', function(req, res) {
  var data = {
    consumerId: _accessToken,
    consumerSecret: _accessSecret,
    userId: req.query.id,
    expire: req.query.duration
  };
  
  http.post('/db/new', data, function(res) {
    console.log(res);
  });
});

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log("Listening on localhost:%s", port);
})
