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
                const localTimeZone = response.body.timezone
                const currentTime = new Date(response.body.currently.time*1000).toLocaleString("en-US", {timeZone: localTimeZone})
                const sunriseTime = new Date(response.body.daily.data[0].sunriseTime*1000).toLocaleString("en-US", {timeZone: localTimeZone})
                const sunsetTime = new Date(response.body.daily.data[0].sunsetTime*1000).toLocaleString("en-US", {timeZone: localTimeZone})
                const forecastString = ((currentTime + " :\n") + 
                                        (response.body.daily.data[0].summary + "\n") +
                                        ("It is currently ") + ( response.body.currently.temperature + "ºF out.\n") + 
                                        ("There is a ") + ( response.body.currently.precipProbability + "% chance of rain.\n") + 
                                        ("Sunrise: " + sunriseTime + " , Sunset: " + sunsetTime))
                callback(undefined, {
                    forecast: forecastString
                })
            }
        }
    )
}


module.exports = forecast