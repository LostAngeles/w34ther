const weatherForecastSide = document.getElementById('weather-forecast-side');
const geolocationSide = document.getElementById('geolocation-side');
const topbar = document.getElementById('topbar');
const settingsExpand = document.getElementById('settings-expand');
const settingsButton = document.getElementById('settings-button');

export function showTopBar() {
	topbar.style.width = '100%';
}

setTimeout(showTopBar, 1000);

export function showMainContent() {
	weatherForecastSide.style.height = '500px';
	geolocationSide.style.height = '500px';

	function weatherNgeoDevide() {
		weatherForecastSide.style.width = '60%';
		geolocationSide.style.width = '30%';
	}

	setTimeout(weatherNgeoDevide, 2000);
}

setTimeout(showMainContent, 4000);

settingsButton.onclick = openSettings;
let settingsMenuIsOpen = false;

export function openSettings() {
	if (!settingsMenuIsOpen) {
		settingsExpand.style.height = '25px';
		settingsExpand.style.paddingTop = '10px';
		settingsExpand.style.paddingBottom = '10px';
	} else {
		settingsExpand.style.height = '0px';
		settingsExpand.style.padding = '0px';
	}
	settingsMenuIsOpen = !settingsMenuIsOpen;
}
