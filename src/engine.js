const weatherForecastSide = document.getElementById("weather-forecast-side");
const geolocationSide = document.getElementById("geolocation-side");

function showTopBar() {
	document.getElementById("topbar").style.width = "100%";
}

setTimeout(showTopBar, 1000);

function showMainContent() {
	weatherForecastSide.style.height = "500px";
	geolocationSide.style.height = "500px";

	function weatherNgeoDevide() {
		weatherForecastSide.style.width = "60%";
		geolocationSide.style.width = "30%";
	}

	setTimeout(weatherNgeoDevide, 2000);
}

setTimeout(showMainContent, 4000);


////////////////////////////////////////////////////

const settingsExpand = document.getElementById("settings-expand");
let openSettingsMenu = false;

function openSettings() {
	if (!(openSettingsMenu)) {
		settingsExpand.style.height = "25px";
		settingsExpand.style.paddingTop = "10px";
		settingsExpand.style.paddingBottom = "10px";
	}
	else if (openSettingsMenu) {
		settingsExpand.style.height = "0px";
		settingsExpand.style.padding = "0px";
	}
	openSettingsMenu = !openSettingsMenu;
}