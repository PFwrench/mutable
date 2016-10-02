const Twitter = require('twitter');

exports.handler = function(event, context, callback) {

    console.log('start request');

    var userId = event.userId;
    var consumerId = event.consumerId;
    var consumerSecret = event.consumerSecret;

    const client = new Twitter({
        consumer_key: consumerId,
        consumer_secret: consumerSecret,
        access_token_key: '782274256671350784-l0dWnhmZwVugjGv5gPCumPqODmQuVTt',
        access_token_secret: 'tPs4ggAT3JqTYwM5LxFHzkcTYTe5lSVFsDZ3e0IF4oS5i'
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