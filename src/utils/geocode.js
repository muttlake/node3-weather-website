const request = require('request')

const MAPBOX_KEY = "pk.eyJ1IjoibXV0dGxha2UiLCJhIjoiY2szZHU5Y2c1MHNjZDNjbnJxN3VvcGJtYyJ9.5R_6JkOZnywAl43oJEu2uQ"

const geocode = (locSearch, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(locSearch) 
                              + ".json?access_token=" + MAPBOX_KEY + "&limit=1"
    request( 
        {
            url,
            json: true
        },
        (error, response) => {
            if(error) {
                callback("Unable to connect to location api." + error, undefined)
            } else if (response.body.error || !response.body.features || response.body.features.length === 0) { 
                callback("Error after connecting to api: " + response.statusCode + " " + 
                                                     response.body.error, undefined)
           } else {
                callback(undefined, {
                   latitude: response.body.features[0].center[1],
                   longitude: response.body.features[0].center[0],
                   location: response.body.features[0].place_name 
                })
            }
        }
    );
}

module.exports = geocode