const backgroundChange = document.getElementById('backgroundChange');
backgroundChange.onclick = changeAppBackground;

export function changeAppBackground() {

	const query = "new-york";
	const url = `https://api.unsplash.com/photos/random?query=town,${query}&client_id=9161e949213aef46ad705500b1cddcbb11ed87c9f569ca1c461f5dcaa9869762`;
	fetch(url)
	.then((res) => res.json())
	.then((data) => {
		console.log(data.urls.small) 
		document.body.style.background = "url("+data.urls.regular+")";
	});
	
}