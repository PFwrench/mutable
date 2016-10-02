const Twitter = require('twitter');

exports.handler = function(event, context, callback) {

    console.log('start request');

    var userId = event.userId;
    var consumerId = event.consumerId;
    var consumerSecret = event.consumerSecret;

    const client = new Twitter({
        consumer_key: "LJED4VTgNSd8WQ0S5bAmi5pZB",
        consumer_secret: "wye1TtPPmoGMCebWVZRK8YyM7f0g88rHmRX2uxYcsDS5YMBHrY",
        access_token_key: consumerId,
        access_token_secret: consumerSecret
    })

    const params = {user_id: userId};

    console.log(userId + ":" + consumerId + ":" + consumerSecret);

    // Mute user ID provided in context data.
    // End the lambda function when the send function completes.
    client.post('mutes/users/create', params, function(error, data, response) {
        if (!error) {
            console.log('success!');
            callback(null, data);
        } else {
            console.log('POST request failed with error: ' + error.message);
            callback(error);
        }
    });

};