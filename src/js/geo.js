import getSkycons from 'skycons';
const Skycons = getSkycons(window);
const latitudeSection = document.getElementById('latitude-section');
const longitudeSection = document.getElementById('longitude-section');
const temperatureSection = document.getElementById('temperature-section');
const summarySection = document.getElementById('summary-section');
const timezoneSection = document.getElementById('timezone-section');
const currentDate = document.getElementById('current-date');
const todayIcon = document.getElementById('today-icon');

const firstDayTitle = document.getElementById('first-day-title');
const firstDayAverageTemp = document.getElementById('first-day-average-temp');
const firstDayIcon = document.getElementById('first-day-icon');
const secondDayTitle = document.getElementById('second-day-title');
const secondDayAverageTemp = document.getElementById('second-day-average-temp');
const secondDayIcon = document.getElementById('second-day-icon');
const thirdDayTitle = document.getElementById('third-day-title');
const thirdDayAverageTemp = document.getElementById('third-day-average-temp');
const thirdDayIcon = document.getElementById('third-day-icon');

const weatherForecastSide= document.getElementById('weather-forecast-side');
const geolocationSide = document.getElementById('geolocation-side');
const topbar = document.getElementById('topbar');
const settingsExpand = document.getElementById('settings-expand');

const fahrenheit = document.getElementById('fahrenheit');
const celsius = document.getElementById('celsius');

let lang = "en"

celsius.style.color = "#EC7063";
fahrenheit.style.color = "inherit";

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
	latitudeSection.innerHTML = `Latitude: ${lat}`;
	longitudeSection.innerHTML = `Longitude: ${long}`;

	const proxy = "https://cors-anywhere.herokuapp.com/";
	const api = `${proxy}https://api.darksky.net/forecast/8405a77329afc31d2d3115965218e846/${lat},${long}?lang=${lang}`;

	function getWeather() {

		fetch(api)
		.then(response => {
			return response.json();
		})
		.then(data => {
			const {temperature, summary, icon } = data.currently;
			temperatureSection.innerHTML = `${Math.floor((temperature-32)*5/9)} C`;
			summarySection.innerHTML = `${summary}`;
			timezoneSection.innerHTML = data.timezone;
			
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0'); 
			let yyyy = today.getFullYear();
			let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

			today = dd + '/' + mm + '/' + yyyy;
			currentDate.innerHTML = today;

			let iconColor = "white";
			function setIcons(icon, iconID) {
				const skycons = new Skycons({color:iconColor});
				const currentIcon = icon.replace(/-/g, "_").toUpperCase();
				skycons.play();
				return skycons.set(iconID, Skycons[currentIcon]);
			}
			
			setIcons(icon, todayIcon);
			firstDayTitle.innerHTML =  (+dd+1) + '/' + mm + '/' + yyyy;
			firstDayAverageTemp.innerHTML = Math.floor((((data.daily.data[1].temperatureMin+data.daily.data[1].temperatureMax)/2-32)*5/9)) + " C";
			setIcons(data.daily.data[1].icon, firstDayIcon);
			secondDayTitle.innerHTML = (+dd+2) + '/' + mm + '/' + yyyy;
			secondDayAverageTemp.innerHTML = Math.floor((((data.daily.data[2].temperatureMin+data.daily.data[2].temperatureMax)/2-32)*5/9)) + " C";
			setIcons(data.daily.data[2].icon, secondDayIcon);
			thirdDayTitle.innerHTML =  (+dd+3) + '/' + mm + '/' + yyyy;
			thirdDayAverageTemp.innerHTML = Math.floor((((data.daily.data[3].temperatureMin+data.daily.data[3].temperatureMax)/2-32)*5/9)) + " C";
			setIcons(data.daily.data[3].icon, thirdDayIcon);

			console.log(data.daily.data[1].icon,data.daily.data[2].icon,data.daily.data[3].icon);

			const darkMode = document.getElementById('dark-mode');
			darkMode.onclick = darkUI;
			const lightMode = document.getElementById('light-mode');
			lightMode.onclick = lightUI;

			function darkUI() {				
				darkMode.style.color = "#EC7063";
				lightMode.style.color = "inherit";
				document.body.style.color = "#ECF0F1"; 
				weatherForecastSide.style.background = "rgba(75, 68, 83, .7)";
				geolocationSide.style.background = "rgba(75, 68, 83, .7)";
				topbar.style.background = "rgba(75, 68, 83, .9)";
				settingsExpand.style.background = "rgba(75, 68, 83, .9)";
				iconColor = "white";
				setIcons(icon, todayIcon)
				setIcons(data.daily.data[1].icon, firstDayIcon);
				setIcons(data.daily.data[2].icon, secondDayIcon);
				setIcons(data.daily.data[3].icon, thirdDayIcon);
			}

			function lightUI() {
				darkMode.style.color = "inherit";
				lightMode.style.color = "#EC7063";
				document.body.style.color = "#000000";
				weatherForecastSide.style.background = "rgba(236, 240, 241, .7)";
				geolocationSide.style.background = "rgba(236, 240, 241, .7)";
				topbar.style.background = "rgba(236, 240, 241, .7)";
				settingsExpand.style.background = "rgba(236, 240, 241, .7)";
				iconColor = "black";
				setIcons(icon, todayIcon)
				setIcons(data.daily.data[1].icon, firstDayIcon);
				setIcons(data.daily.data[2].icon, secondDayIcon);
				setIcons(data.daily.data[3].icon, thirdDayIcon);
			}

			fahrenheit.onclick = convertToFahrenheit;
			celsius.onclick = convertToCelsius;

			function convertToFahrenheit() {
				fahrenheit.style.color = "#EC7063";
				celsius.style.color = "inherit";
				temperatureSection.innerHTML = `${Math.floor(temperature)} F`;
				firstDayAverageTemp.innerHTML = Math.floor((data.daily.data[1].temperatureMin+data.daily.data[1].temperatureMax)/2) + " F";
				secondDayAverageTemp.innerHTML = Math.floor((data.daily.data[2].temperatureMin+data.daily.data[2].temperatureMax)/2) + " F";
				thirdDayAverageTemp.innerHTML = Math.floor((data.daily.data[3].temperatureMin+data.daily.data[3].temperatureMax)/2) + " F";
			}

			function convertToCelsius() {
				celsius.style.color = "#EC7063";
				fahrenheit.style.color = "inherit";
				temperatureSection.innerHTML = `${Math.floor((temperature-32)*5/9)} C`;
				firstDayAverageTemp.innerHTML = Math.floor((((data.daily.data[1].temperatureMin+data.daily.data[1].temperatureMax)/2-32)*5/9)) + " C";
				secondDayAverageTemp.innerHTML = Math.floor((((data.daily.data[2].temperatureMin+data.daily.data[2].temperatureMax)/2-32)*5/9)) + " C";
				thirdDayAverageTemp.innerHTML = Math.floor((((data.daily.data[3].temperatureMin+data.daily.data[3].temperatureMax)/2-32)*5/9)) + " C";
			}
		})
	}
	getWeather();
}
