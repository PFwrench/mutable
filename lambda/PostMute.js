var https = require('https');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'LJED4VTgNSd8WQ0S5bAmi5pZB',
    consumer_secret: 'wye1TtPPmoGMCebWVZRK8YyM7f0g88rHmRX2uxYcsDS5YMBHrY',
    access_token_key: '782274256671350784-l0dWnhmZwVugjGv5gPCumPqODmQuVTt',
    access_token_secret: 'tPs4ggAT3JqTYwM5LxFHzkcTYTe5lSVFsDZ3e0IF4oS5i'
})

var params = {user_id: ''};

// Lambda function:
exports.handler = function(event, context) {

    console.log('start request to ' + event.url)

    // Mute user ID provided in event data.
    // End the lambda function when the send function completes.
    client.post('mutes/users/create', params, function(error) {
        if (!error) {
            console.log('success!');
        }
    });

};

// function PostMute(target_id) {

//     // Options and headers for the HTTP requestvar 
//     options = {
//         host: 'api.twitter.com',
//         path: '/mutes/users/create.json',
//         method: 'POST',
//         headers: {
//             'user_id' : target_id
//         }
//     };

//     // Setup the HTTP request
//     var req = https.request(options, function (res) {

//         res.setEncoding('utf-8');

//         // Collect response data as it comes back.
//         var responseString = '';
//         res.on('data', function (data) {
//             responseString += data;
//         });

//         // Handler for HTTP request errors.
//         req.on('error', function (e) {
//             console.error('HTTP error: ' + e.message);
//             completedCallback('API request completed with error(s).');
//         });

//         // Send the HTTP request to the Twitter API.
//         // Log the message we are sending to Twitter.
//         console.log('Twitter API call: Mute user_id=' + target_id);
//         req.write(messageString);
//         req.end();
//     })

// }