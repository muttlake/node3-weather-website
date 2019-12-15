const request = require('request')

const DARKSKY_SECRETKEY = "9ced5a9ee75d704ad44ac85c355f2267"

const forecast = ({latitude, longitude}, callback) => {
    const url = "https://api.darksky.net/forecast/" + DARKSKY_SECRETKEY + "/" + 
                             latitude + "," + longitude
    request( 
        {
            url,
            json: true
        },
        (error, response) => {
            if(error) {
                callback("Unable to connect to weather service: Error:\n" + error, undefined)
            } else if (response.body.error) {
                callback("Unable to find location. Error: " + response.statusCode + " " + response.body.error, undefined)
            } else {
                const forecastString = ((response.body.daily.data[0].summary + "  ") +
                                        ("It is currently ") + ( response.body.currently.temperature + "ºF") + 
                                        (" out.") +
                                        ("  There is a ") + ( response.body.currently.precipProbability + "%") + 
                                        (" chance of rain."));
                callback(undefined, {
                    forecast: forecastString
                })
            }
        }
    )
}


module.exports = forecast