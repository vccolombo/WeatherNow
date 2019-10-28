const request = require('request');

const GEOCODE_API_KEY = process.env.MAPBOX_API_KEY;

const geocode = (address, callback) => {
    const addressURI = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressURI}.json?access_token=${GEOCODE_API_KEY}&limit=1`

    request({
        url,
        json: true
    }, (error, response) => {
        console.log(error, response.body);
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.message === 'Not Authorized - Invalid Token') {
            callback('Unable to connect to services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;