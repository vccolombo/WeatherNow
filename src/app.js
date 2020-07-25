const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./api/geocodeAPI');
const { forecast } = require('./api/weatherAPI')
const weather_icons = require('./weather_icons');

const app = express();

const public_directory_path = path.join(__dirname, '../public');
app.use(express.static(public_directory_path));

app.set('view engine', 'hbs');
const view_path = path.join(__dirname, '../templates/views');
app.set('views', view_path);

const partials_path = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/find', (req, res) => {
    const query = req.query;
    geocode(query.search, (error, cities) => {
        if (error) {
            console.log(error);
            return res.render('index', {
                message1: error
            });
        }

        res.render('find', {
            cities
        });
    });
});

app.get('/weather', (req, res) => {
    const {
        latitude,
        longitude,
        location
    } = req.query;

    forecast({
        latitude,
        longitude
    }, (error, forecast) => {
        if (error) {
            console.log(error);
            return res.render('index', {
                message1: error
            });
        }
        
        console.log(forecast);
        const summary = forecast.currently.summary;
        const icon = weather_icons[forecast.currently.icon];
        res.render('weather', {
            location,
            summary,
            curr_temperature: Math.round(forecast.currently.temperature),
            curr_apparent: Math.round(forecast.currently.apparentTemperature),
            curr_precipitation: Math.round(forecast.currently.precipIntensity),
            curr_wind: Math.round(forecast.currently.windSpeed),
            curr_humidity: forecast.currently.humidity * 100,
            curr_icon: icon ? `/img/${icon}` : null,
            today: forecast.today
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        text: "Help article not found"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        text: "Page not found"
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});