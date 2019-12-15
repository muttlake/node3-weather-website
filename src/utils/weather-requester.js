const geocode = require('./geocode')
const forecast = require('./forecast')

const getWeather = (location, callback) => {
    geocode(location, (error, geoData) => {
        if(error) {
            callback(  {
                           searchTerm: location,
                           error: "Error getting location."
                        }, 
                        undefined
                    )
        } else {
            forecast(geoData, (error, forecastData) => {
                if(error) {
                    callback(   {
                                    searchTerm: location,
                                    error: "Error getting weather."
                                },
                                undefined
                            )
                } else {
                    callback(   undefined,
                                {
                                    searchTerm: location,
                                    location: geoData,
                                    forecast: forecastData
                                }
                            )
                }
            })
        }
    })
}


module.exports = getWeather