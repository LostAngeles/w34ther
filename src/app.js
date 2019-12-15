import './style.css';
import "./js/dom.js";
import "./js/geo.js";
import "./js/changeAppBackground.js";
import "./js/current-time.js"; 
import "./js/startSearching.js"; 


const settingsExpand = document.getElementById('settings-expand');
const settingsButton = document.getElementById('settings-button');
settingsButton.onclick = openSettings;
let settingsMenuIsOpen = false;

function openSettings() {
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
