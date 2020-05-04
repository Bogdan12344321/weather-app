const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0d5844c629f49b125863a2710670afce&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=m";
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to database');
        } else if (body.error) {
            callback("Unable to find location");
        } else {

            callback(undefined, `${body.current.weather_descriptions[0]}. It is curently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out. Visibility is ${body.current.visibility}, and the humidity is ${body.current.humidity}`)
        }
    })
}

module.exports = forecast