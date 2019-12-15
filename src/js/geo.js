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
}
