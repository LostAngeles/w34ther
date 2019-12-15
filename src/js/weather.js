const api = `https://api.darksky.net/forecast/8405a77329afc31d2d3115965218e846/${lat},${long}`;

fetch(api)
	.then(response => {
		return response.json();
	})
	.then(data => {
		const {temperature, summary } = data.currently;
		document.getElementById('temperature').innerHTML = temperature;
		document.getElementById('summary').innerHTML = summary;
	})