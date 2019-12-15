const weatherForecastSide = document.getElementById('weather-forecast-side');
const geolocationSide = document.getElementById('geolocation-side');
const topbar = document.getElementById('topbar');

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

export function startSearching() {
	alert("hello!")
}