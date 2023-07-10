import {addOffset, validateIp} from './helpers/helper-index.mjs';


const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize: [30, 40],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [47.58204, -122.16707],
    zoom: 13,
    zoomControl: false,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 120    ,
    attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="#">Danil Shatalov</a>.'
}).addTo(map);

L.marker([47.58204, -122.16707], {icon: markerIcon }).addTo(map);

function getData() {
    if(validateIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_mlVfpQBmlWKPI38epqtXiaqX5jG6x&ipAddress=${ipInput.value}`)
    .then(response => response.json())
    .then(data => setInfo(data))
    }
}

function handleKey(event) {
    if(event.key === 'Enter') {
        getData()
    }
}

function setInfo(mapData) {
    console.log(mapData);
    const {city, country, geonameId, lat, lng} = mapData.location;
    ipInfo.innerHTML = mapData.ip;
    locationInfo.innerHTML = `${mapData.location.country} ${mapData.location.region}`;
    timezoneInfo.innerHTML = mapData.location.timezone;
    ispInfo.innerHTML = mapData.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);
   if(matchMedia("(max-width: 1023px)").matches) {
         addOffset(map);
   } 
}





