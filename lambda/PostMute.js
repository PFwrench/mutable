// Twitter Credentials
var consumerKey = 'LJED4VTgNSd8WQ0S5bAmi5pZB';
var consumerSecret = 'wye1TtPPmoGMCebWVZRK8YyM7f0g88rHmRX2uxYcsDS5YMBHrY';

var https = require('https');

// Lambda function:
exports.handler = function(event, context) {

    console.log('start request to ' + event.url)

    // Mute user ID provided in event data.
    // End the lambda function when the send function completes.
    PostMute(event.user_id, function (status) { context.done(null, status); });

};

function PostMute(target_id) {

    // Options and headers for the HTTP requestvar 
    options = {
        host: 'api.twitter.com',
        path: '/mutes/users/create.json',
        method: 'POST',
        headers: {
            'user_id' : target_id
        }
    };

    // Setup the HTTP request
    var req = https.request(options, function (res) {

        res.setEncoding('utf-8');

        // Collect response data as it comes back.
        var responseString = '';
        res.on('data', function (data) {
            responseString += data;
        });

        // Handler for HTTP request errors.
        req.on('error', function (e) {
            console.error('HTTP error: ' + e.message);
            completedCallback('API request completed with error(s).');
        });

        // Send the HTTP request to the Twitter API.
        // Log the message we are sending to Twitter.
        console.log('Twitter API call: Mute user_id=' + target_id);
        req.write(messageString);
        req.end();
    })

}