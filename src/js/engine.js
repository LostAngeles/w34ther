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
const weatherForecastSide = document.getElementById('weather-forecast-side');
const geolocationSide = document.getElementById('geolocation-side');
const topbar = document.getElementById('topbar');
const settingsExpand = document.getElementById('settings-expand');
const fahrenheit = document.getElementById('fahrenheit');
const celsius = document.getElementById('celsius');
const langEn = document.getElementById('lang-en');
const langBe = document.getElementById('lang-be');
const langRu = document.getElementById('lang-ru');
const settingsButtonText = document.getElementById('settings-button-text');
const backgroundChange = document.getElementById('backgroundChange');
const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');
const soundEnable = document.getElementById('soundEnable');
const soundDisable = document.getElementById('soundDisable');
const titleGeo = document.getElementById('titleGeo');
const titleWeather = document.getElementById('titleWeather');
const searchFormButton = document.getElementById('search-form-button');
const searchForm = document.getElementById('search-form');
const searchFormBox = document.getElementById('search-form-box');
const citySearchIcon = document.getElementById('city-search-icon');



let lang = 'en';
let theme;
let units;

let iconDataStorage;
let currentLat;
let currentLong;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Initial
//langEn.style.color = "#EC7063";
//langBe.style.color = "inherit";
//langRu.style.color = "inherit";
//celsius.style.color = "#EC7063";
//fahrenheit.style.color = "inherit";

navigator.geolocation.getCurrentPosition(locationSuccess);

export function locationSuccess({ coords: { latitude, longitude } }) {
	currentLat = Math.floor(latitude * 100) / 100;
	currentLong = Math.floor(longitude * 100) / 100;
	
	searchForm.onsubmit = superSixOne;

	function superSixOne() {

		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const testPosition = `${proxy}https://api.opencagedata.com/geocode/v1/json?q=${searchFormBox.value}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
		fetch(testPosition)
		.then(response => {
			return response.json();
		})
		.then(data => {
			currentLat = data.results[0].geometry.lat; 
			currentLong = data.results[0].geometry.lng;
			console.log("superSixOne is running");
			console.log(searchFormBox.value);
			console.log("superSixOne is running");
			getWeather()
			drawMap() 
		})		
		
	}

	console.log(currentLat);
	console.log(currentLong);

	function drawMap() {
		mapboxgl.accessToken =
		'pk.eyJ1Ijoibmlra2lodXNreSIsImEiOiJjazQyb2I5emEwMTBqM21wamRyNGFqbjhsIn0.4zKa56yt6D38p-rVO8I-PQ';
		new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [currentLong, currentLat],
			zoom: 9,
		});
	}
	drawMap()
	langEn.onclick = changeLangToEn;
	langBe.onclick = changeLangToBe;
	langRu.onclick = changeLangToRu;

	function changeLangToEn() {
		lang = 'En';
		settingsButtonText.innerHTML = 'Settings';
		backgroundChange.innerHTML = 'Change background';
		fahrenheit.innerHTML = 'Fahrenheit (F)';
		celsius.innerHTML = 'Celsius (C)';
		darkMode.innerHTML = 'Dark';
		lightMode.innerHTML = 'Light';		
		titleWeather.innerHTML = 'Hello!';
		titleGeo.innerHTML = 'Geolocation';
		langEn.style.color = '#EC7063';
		langBe.style.color = 'inherit';
		langRu.style.color = 'inherit';
		latitudeSection.innerHTML = `Latitude: ${currentLat}`;
		longitudeSection.innerHTML = `Longitude: ${currentLong}`;
		getWeather();
	}

	function changeLangToRu() {
		lang = 'Ru';
		settingsButtonText.innerHTML = 'Настройки';
		backgroundChange.innerHTML = 'Сменить заставку';
		fahrenheit.innerHTML = 'Фаренгейт (F)';
		celsius.innerHTML = 'Цельсий (C)';
		darkMode.innerHTML = 'Темный';
		lightMode.innerHTML = 'Светлый';		
		titleWeather.innerHTML = 'Привет!';
		titleGeo.innerHTML = 'Локация';
		langEn.style.color = 'inherit';
		langBe.style.color = 'inherit';
		langRu.style.color = '#EC7063';
		latitudeSection.innerHTML = `Широта: ${currentLat}`;
		longitudeSection.innerHTML = `Долгота: ${currentLong}`;
		getWeather();
	}

	function changeLangToBe() {
		lang = 'Be';
		settingsButtonText.innerHTML = 'Налады';
		backgroundChange.innerHTML = 'Змяніць застаўку';
		fahrenheit.innerHTML = 'Фарэнгейт';
		celsius.innerHTML = 'Цэльсій';
		darkMode.innerHTML = 'Цёмны';
		lightMode.innerHTML = 'Светлы';		
		titleWeather.innerHTML = 'Прывітанне!';
		titleGeo.innerHTML = 'Лакацыя';
		langEn.style.color = 'inherit';
		langBe.style.color = '#EC7063';
		langRu.style.color = 'inherit';
		latitudeSection.innerHTML = `Шырата: ${currentLat}`;
		longitudeSection.innerHTML = `Даўгата: ${currentLong}`;
		getWeather();
	}


	function getWeather() {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const api = `${proxy}https://api.darksky.net/forecast/8405a77329afc31d2d3115965218e846/${currentLat},${currentLong}?lang=${lang}`;

		fetch(api)
		.then(response => {
			return response.json();
		})
		.then(data => {
			const { temperature, summary, icon } = data.currently;                
			temperatureSection.innerHTML = `${Math.floor(
				((temperature - 32) * 5) / 9
				)} C`;
			summarySection.innerHTML = `${summary}`;
			timezoneSection.innerHTML = data.timezone;

			console.log("=======")
			console.log(new Date(data.currently.time));
			console.log("=======")

			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0');
			let yyyy = today.getFullYear();
			let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
			today = dd + '/' + mm + '/' + yyyy;
			currentDate.innerHTML = today;

			let iconColor = 'white';
			function setIcons(icon, iconID) {
				const skycons = new Skycons({ color: iconColor });
				const currentIcon = icon.replace(/-/g, '_').toUpperCase();
				skycons.play();
				return skycons.set(iconID, Skycons[currentIcon]);
			}

			setIcons(icon, todayIcon);
			iconDataStorage = icon;
			firstDayTitle.innerHTML = +dd + 1 + '/' + mm + '/' + yyyy;
			firstDayAverageTemp.innerHTML =
			Math.floor(
				(((data.daily.data[1].temperatureMin +
					data.daily.data[1].temperatureMax) /
				2 -
				32) *
				5) /
				9
				) + ' C';
			setIcons(data.daily.data[1].icon, firstDayIcon);
			secondDayTitle.innerHTML = +dd + 2 + '/' + mm + '/' + yyyy;
			secondDayAverageTemp.innerHTML =
			Math.floor(
				(((data.daily.data[2].temperatureMin +
					data.daily.data[2].temperatureMax) /
				2 -
				32) *
				5) /
				9
				) + ' C';
			setIcons(data.daily.data[2].icon, secondDayIcon);
			thirdDayTitle.innerHTML = +dd + 3 + '/' + mm + '/' + yyyy;
			thirdDayAverageTemp.innerHTML =
			Math.floor(
				(((data.daily.data[3].temperatureMin +
					data.daily.data[3].temperatureMax) /
				2 -
				32) *
				5) /
				9
				) + ' C';
			setIcons(data.daily.data[3].icon, thirdDayIcon);

			console.log(
				data.daily.data[1].icon,
				data.daily.data[2].icon,
				data.daily.data[3].icon
				);

			darkMode.onclick = darkUI;
			lightMode.onclick = lightUI;

			function darkUI() {
				darkMode.style.color = '#EC7063';
				lightMode.style.color = 'inherit';
				document.body.style.color = '#ECF0F1';
				weatherForecastSide.style.background =
				'rgba(75, 68, 83, .7)';
				geolocationSide.style.background = 'rgba(75, 68, 83, .7)';
				topbar.style.background = 'rgba(75, 68, 83, .9)';
				settingsExpand.style.background = 'rgba(75, 68, 83, .9)';
				iconColor = 'white';
				citySearchIcon.style.color = "#ffffff";
				searchFormBox.style.color = "#ffffff";
				searchFormBox.style.background = "rgb(75, 68, 83)";
				searchFormButton.style.background = "rgb(75, 68, 83)";
				setIcons(icon, todayIcon);
				setIcons(data.daily.data[1].icon, firstDayIcon);
				setIcons(data.daily.data[2].icon, secondDayIcon);
				setIcons(data.daily.data[3].icon, thirdDayIcon);
			}

			function lightUI() {
				darkMode.style.color = 'inherit';
				lightMode.style.color = '#EC7063';
				document.body.style.color = '#000000';
				weatherForecastSide.style.background =
				'rgba(236, 240, 241, .7)';
				geolocationSide.style.background =
				'rgba(236, 240, 241, .7)';
				topbar.style.background = 'rgba(236, 240, 241, .7)';
				settingsExpand.style.background = 'rgba(236, 240, 241, .7)';
				iconColor = 'black';
				citySearchIcon.style.color = "#000000";
				searchFormBox.style.color = "#000000";
				searchFormBox.style.background = "#F2F3F4";
				searchFormButton.style.background = "#F2F3F4";
				setIcons(icon, todayIcon);
				setIcons(data.daily.data[1].icon, firstDayIcon);
				setIcons(data.daily.data[2].icon, secondDayIcon);
				setIcons(data.daily.data[3].icon, thirdDayIcon);
			}

			fahrenheit.onclick = convertToFahrenheit;
			celsius.onclick = convertToCelsius;

			function convertToFahrenheit() {
				fahrenheit.style.color = '#EC7063';
				celsius.style.color = 'inherit';
				temperatureSection.innerHTML = `${Math.floor(
					temperature
					)} F`;
				firstDayAverageTemp.innerHTML =
				Math.floor(
					(data.daily.data[1].temperatureMin +
						data.daily.data[1].temperatureMax) /
					2
					) + ' F';
				secondDayAverageTemp.innerHTML =
				Math.floor(
					(data.daily.data[2].temperatureMin +
						data.daily.data[2].temperatureMax) /
					2
					) + ' F';
				thirdDayAverageTemp.innerHTML =
				Math.floor(
					(data.daily.data[3].temperatureMin +
						data.daily.data[3].temperatureMax) /
					2
					) + ' F';
			}

			function convertToCelsius() {
				celsius.style.color = '#EC7063';
				fahrenheit.style.color = 'inherit';
				temperatureSection.innerHTML = `${Math.floor(
					((temperature - 32) * 5) / 9
					)} C`;
				firstDayAverageTemp.innerHTML =
				Math.floor(
					(((data.daily.data[1].temperatureMin +
						data.daily.data[1].temperatureMax) /
					2 -
					32) *
					5) /
					9
					) + ' C';
				secondDayAverageTemp.innerHTML =
				Math.floor(
					(((data.daily.data[2].temperatureMin +
						data.daily.data[2].temperatureMax) /
					2 -
					32) *
					5) /
					9
					) + ' C';
				thirdDayAverageTemp.innerHTML =
				Math.floor(
					(((data.daily.data[3].temperatureMin +
						data.daily.data[3].temperatureMax) /
					2 -
					32) *
					5) /
					9
					) + ' C';
			}
			console.log(iconDataStorage);
			

			backgroundChange.onclick = changeAppBackground;
			function changeAppBackground() {
				//const query = 'new-york';
				iconDataStorage = iconDataStorage.replace(/-/g, ',');
				const url = `https://api.unsplash.com/photos/random?query=town,${iconDataStorage}&client_id=9161e949213aef46ad705500b1cddcbb11ed87c9f569ca1c461f5dcaa9869762`;
				fetch(url)
				.then(res => res.json())
				.then(data => {
					console.log(url);
					document.body.style.background =
					'url(' + data.urls.regular + ') no-repeat center top / cover';
				});
			}		

		});
}
getWeather();
}
