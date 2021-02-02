const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const viewsPath = path.join(__dirname, '../templates/views'); // default is set to a /views path; this overrides it
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Chace Lorans'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Chace Lorans'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'Help Page',
		title: 'Help',
		name: 'Chace Lorans'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error: error
			});
		}
		
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help page not found',
		name: 'Chace Lorans'
	});
});

// match anything that hasn't been matched before - used to generate error pages and has to be just before listening to port
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Chace Lorans',
		errorMessage: 'Page not found'
	});
});

app.listen(3000, () => {
	console.log('Server is up on PORT 3000...');
});