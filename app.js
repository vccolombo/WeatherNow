const request = require('request');
const chalk = require('chalk');

const weather_url = 'https://api.darksky.net/forecast/52242d28dffba52eed99f1650ea5ba15/37.8267,-122.4233?units=si'

request({
    url: weather_url,
    json: true
}, (error, resp) => {
    if (error) {
        console.log(chalk.red.inverse(
            "Unable to connect to weather service! " +
            "Please check your internet connection."
        ))
    } else if (resp.body.error) {
        console.log(chalk.red.inverse("Unable to find location."));
    } else {
        const currently = resp.body.currently;
        const temperature = currently.temperature;
        const rainProbability = currently.precipProbability;

        const today = resp.body.daily.data[0]

        console.log(
            `${today.summary} It is currently ${chalk.blue.inverse(temperature)} degrees out. 
            There is a ${rainProbability}% chance of rain.`
        )
    }

})

const geocoding_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/sao paulo.json?access_token=pk.eyJ1IjoidmNjb2xvbWJvIiwiYSI6ImNrMWdkenFsbzEzam0zam12eHQ1emJld2QifQ.n-o6uKAJiDnEAMpX3s70fQ&limit=1"

request({
    url: geocoding_url,
    json: true
}, (error, resp) => {
    if (error) {
        console.log(chalk.red.inverse(
            "Unable to connect to geocoding service! " +
            "Please check your internet connection."
        ))
    } else if (resp.body.features.length === 0) {
        console.log(chalk.red.inverse("Unable to find location."));
    } else {
        console.log(resp.body.features[0].center);
    }
})