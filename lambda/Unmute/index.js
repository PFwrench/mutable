const Twitter = require('twitter');

exports.handler = function(event, context, callback) {

    const client = new Twitter({
        consumer_key: event.consumerId,
        consumer_secret: event.consumerSecret,
        access_token_key: '782274256671350784-l0dWnhmZwVugjGv5gPCumPqODmQuVTt',
        access_token_secret: 'tPs4ggAT3JqTYwM5LxFHzkcTYTe5lSVFsDZ3e0IF4oS5i'
    })

    const params = {user_id: event.userId};
    
    console.log('start request to unmute user ' + params.user_id)

    // Unmute user ID provided in context data.
    // End the lambda function when the send function completes.
    client.post('mutes/users/destroy', params, function(error, data, response) {
        if (!error) {
            console.log('success!');
            callback(null, data);
        } else {
            console.log('POST request failed with error: ' + error.message);
            callback(error);
        }
    });
};