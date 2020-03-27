const request = require('request');

const WEATHER_API_KEY = process.env.DARKSKY_API_KEY;

const forecast = ({
    latitude,
    longitude
}, callback) => {
    const url = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${latitude},${longitude}?units=si`

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services. ERROR: ' + error, undefined);
        } else if (response.body.error) {
            callback('Unable to find location. ERROR: ' + response.body.error, undefined);
        } else {
            console.log(response.body)
            callback(undefined, {
                currently: response.body.currently,
                today: response.body.daily.data[0]
            });
        }
    });
}

module.exports = {
    forecast: forecast
}