const geocode = require('./api/geocode');
const weather = require('./api/weather');

geocode("São Paulo", (error, data) => {
    console.log('Error:', error);
    console.log('Data:', data);

    weather.forecast({
        latitude: data.latitude,
        longitude: data.longitude
    }, (error, data) => {
        console.log('Error:', error);
        console.log('Data:', data);
    })
})