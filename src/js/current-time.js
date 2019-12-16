export function currentTime() {

	let date= new Date();

	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	if(minutes < 10) minutes = "0" + minutes;
	if(seconds < 10) seconds = "0" + seconds;

	document.getElementById('current-time').innerHTML = hours + ":" + minutes + ":" + seconds;
	setTimeout(currentTime,100)
}

currentTime();
