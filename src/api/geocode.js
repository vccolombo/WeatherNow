const request = require('request');

const geocode = (address, callback) => {
    const addressURI = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressURI}.json?access_token=pk.eyJ1IjoidmNjb2xvbWJvIiwiYSI6ImNrMWdkenFsbzEzam0zam12eHQ1emJld2QifQ.n-o6uKAJiDnEAMpX3s70fQ&limit=1`

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location.', undefined);
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