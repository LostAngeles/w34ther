import getSkycons from 'skycons';
const Skycons = getSkycons(window);

navigator.geolocation.getCurrentPosition(locationSuccess);

export function locationSuccess({ coords: { latitude, longitude } }) { 
	const lat = Math.floor(latitude * 100) / 100;
	const long = Math.floor(longitude * 100) / 100;    
	
	mapboxgl.accessToken = 'pk.eyJ1Ijoibmlra2lodXNreSIsImEiOiJjazQyb2I5emEwMTBqM21wamRyNGFqbjhsIn0.4zKa56yt6D38p-rVO8I-PQ';
	new mapboxgl.Map({
		container: 'map', 
		style: 'mapbox://styles/mapbox/streets-v11', 
		center: [long, lat], 
		zoom: 9 
	});
	let tempString;
	tempString = " " + lat;
	document.getElementById('latitude').innerHTML = `Latitude: ${lat}`;
	document.getElementById('longitude').innerHTML = `Longitude: ${long}`;

	const proxy = "https://cors-anywhere.herokuapp.com/";
	const api = `${proxy}https://api.darksky.net/forecast/8405a77329afc31d2d3115965218e846/${lat},${long}`;

	function getWeather() {

		fetch(api)
		.then(response => {
			return response.json();
		})
		.then(data => {
			const {temperature, summary, icon } = data.currently;
			document.getElementById('temperature').innerHTML = `${Math.floor(temperature)} F`;
			document.getElementById('summary').innerHTML = `${summary}`;
			document.getElementById('timezone').innerHTML = data.timezone;
			
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0'); 
			let yyyy = today.getFullYear();
			let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

			today = dd + '/' + mm + '/' + yyyy;
			document.getElementById('current-date').innerHTML = today;


			function setIcons(icon, iconID) {
				const skycons = new Skycons({color:"white"});
				const currentIcon = icon.replace(/-/g, "_").toUpperCase();
				skycons.play();
				return skycons.set(iconID, Skycons[currentIcon]);
			}
			
			setIcons(icon, document.getElementById('icon'))

			document.getElementById('first-day-title').innerHTML =  (+dd+1) + '/' + mm + '/' + yyyy;
			document.getElementById('first-day-average-temp').innerHTML = Math.floor((data.daily.data[1].temperatureMin+data.daily.data[1].temperatureMax)/2) + " F";
			setIcons(data.daily.data[1].icon, document.getElementById('first-day-icon'));
			document.getElementById('second-day-title').innerHTML = (+dd+2) + '/' + mm + '/' + yyyy;
			document.getElementById('second-day-average-temp').innerHTML = Math.floor((data.daily.data[2].temperatureMin+data.daily.data[2].temperatureMax)/2) + " F";
			setIcons(data.daily.data[2].icon, document.getElementById('second-day-icon'));
			document.getElementById('third-day-title').innerHTML =  (+dd+3) + '/' + mm + '/' + yyyy;
			document.getElementById('third-day-average-temp').innerHTML = Math.floor((data.daily.data[3].temperatureMin+data.daily.data[3].temperatureMax)/2) + " F";
			setIcons(data.daily.data[3].icon, document.getElementById('third-day-icon'));
			console.log(data.daily.data[1].icon,data.daily.data[2].icon,data.daily.data[3].icon);

			})

	}
	getWeather();
}
