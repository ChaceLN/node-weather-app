const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=eb4c283346de041874998c5c18268a09&query=${longitude},${latitude}`
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to fetch weather stack API!', undefined);
		} else if (body.error) {
			callback('Unable to find location.', undefined);
		} else {
			callback(undefined, {
				temperature: body.current.temperature,
				feelslike: body.current.feelslike
			});
		}
	});
};

module.exports = forecast;