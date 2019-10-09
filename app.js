const geocode = require('./api/geocode');
const weather = require('./api/weather');

const location = process.argv[2];

if (!location) {
    console.log('No location provived.');
} else {
    geocode(location, (error, {
        latitude,
        longitude,
        location
    }) => {
        if (error) {
            return console.log('Error:', error);
        }

        weather.forecast({
            latitude,
            longitude
        }, (error, forecastData) => {
            if (error) {
                return console.log('Error:', error);
            }

            console.log(`${location}: ${forecastData}`);
        })
    })
}