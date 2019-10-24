const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./api/geocodeAPI');
const {
    forecast
} = require('./api/weatherAPI')

const app = express();

const public_directory_path = path.join(__dirname, '../public');
app.use(express.static(public_directory_path));

app.set('view engine', 'hbs');
const view_path = path.join(__dirname, '../templates/views');
app.set('views', view_path);

const partials_path = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Víctor Colombo'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        image_src: "/img/mypicture.jpeg",
        name: "Víctor Colombo"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "How can I help you?",
        helpText: "Some useless text",
        name: "Víctor Colombo"
    })
})

app.get('/weather', (req, res) => {
    const query = req.query;
    if (!query.search) {
        return res.send({
            error: 'No location provided'
        })
    }

    geocode(query.search, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast({
            latitude,
            longitude
        }, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast,
                location,
                search: query.search
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Page Not Found",
        text: "Help article not found",
        name: "Víctor Colombo"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Page Not Found",
        text: "Page not found",
        name: "Víctor Colombo"
    })
})

const port = 3000;
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});