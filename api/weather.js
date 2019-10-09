const request = require('request');

const forecast = ({
    latitude,
    longitude
}, callback) => {
    const url = `https://api.darksky.net/forecast/52242d28dffba52eed99f1650ea5ba15/${latitude},${longitude}?units=si`

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. This is probably an internal error, please try again later.', undefined);
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