const request = require('request');

const GEOCODE_API_KEY = process.env.MAPBOX_API_KEY;

const geocode = (address, callback) => {
    const addressURI = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressURI}.json?access_token=${GEOCODE_API_KEY}&limit=10`;

    request({
        url,
        json: true
    }, (error, response) => {
        console.log(error, response.body.features);
        if (error || response.body.message) {
            console.log(error, response.body.message);
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, response.body.features);
        }
    });
}

module.exports = geocode;