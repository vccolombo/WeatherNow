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
            callback('Unable to connect to weather services', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. ERROR: ' + response.body.error, undefined);
        } else {
            const today = response.body.daily.data[0];
            const {
                temperature,
                precipProbability: rainProbability
            } = response.body.currently;

            callback(undefined, `${today.summary} It is currently ${temperature} degrees out. There is a ${rainProbability}% chance of rain.`);
        }
    })
}

module.exports = {
    forecast: forecast
}