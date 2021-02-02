const request = require('postman-request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hhY2VsbiIsImEiOiJja2psajMyYnMwb2s1MnNzMjUzZGF6NHF2In0.csVBHHgVbvdf5nOoTtDxlw&limit=1`
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to fetch map box API!', undefined);
		} else if (response.body.features.length === 0) {
			callback('Unable to find location. Try again with a different search term.', undefined);
		} else {
			callback(undefined, {
				latitude: response.body.features[0].center[1],
				longitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;