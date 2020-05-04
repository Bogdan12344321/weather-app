const path = require('path')
const express = require('express');

const app = express();
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast')
//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath)
app.use(cors());

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pitaroiu Bogdan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Pitaroiu Bogdan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Welcome to the help page.",
        title: 'Help',
        name: 'Pitaroiu Bogdan'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, obj) => {
            console.log(obj)
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: obj,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        message: "404",
        title: 'Help',
        name: 'Pitaroiu Bogdan'
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        message: "404",
        title: 'Help',
        name: 'Pitaroiu Bogdan'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})