const request = require('request');
const chalk = require('chalk');

const url = 'https://api.darksky.net/forecast/52242d28dffba52eed99f1650ea5ba15/37.8267,-122.4233?units=si'

request({
    url: url,
    json: true
}, (error, resp) => {
    const currently = resp.body.currently;
    const temperature = currently.temperature;
    const rainProbability = currently.precipProbability;

    const today = resp.body.daily.data[0]

    console.log(
        `${today.summary} It is currently ${chalk.blue.inverse(temperature)} degrees out. There is a ${rainProbability}% chance of rain.`
    )
})