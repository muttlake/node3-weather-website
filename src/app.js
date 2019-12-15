const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather =require('./utils/weather-requester')

//create an instance of express
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Express
app.use( express.static( publicDirectoryPath ) )

// Request Paths
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Timothy Harold'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Harold Barold'
    })
})

app.get('/help', (req, res) => {
    res.render('help', 
        {
            title: 'Help',
            name: 'Harold Barold',
            message: 'If you need help ask your mom and she may be able to help'
        }
    )
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    console.log(req.headers.host + req.url)
    getWeather(req.query.address, (error, response) => {
        if(error) {
            res.send(error)
        } else {
            res.send(response)
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', 
        {
            title:"404",
            name: 'Harold Barold',
            errorMessage: 'Help article not found.'
        }
    )
})

app.get('*', (req, res) => {
    res.render('404', 
        {
            title:"404",
            name: 'Harold Barold',
            errorMessage: 'Page not found.'
        }
    )
})

//use port 3000
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})

