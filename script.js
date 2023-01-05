//using leafletjs library to set initial map view to the center of the map, zoomed out
const issMap = L.map('issMap').setView([0, 0], 4); 

const attribution = 
	{
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}
//tileURL is the link to any given tile on the map. s is a subdomain available for an API request request, 
	//z is zoom, x and y are coords
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapTiles = L.tileLayer(tileURL, attribution); 
mapTiles.addTo(issMap);

//leafletjs icon and marker setup
const issIcon = L.icon({
    iconUrl: 'International_Space_Station.png',

    iconSize:     [50, 32], 
    iconAnchor:   [25, 16], //where marker displays, is centered on the icon 
});

const markerOptions = {
	alt: 'ISS', //alt text
	icon: issIcon,
	autoPanOnFocus: true //pans map to fit to the marker when focused (i.e. hitting tab)
}

const marker = L.marker([0, 0], markerOptions).addTo(issMap); //setting marker to initial value of 0,0 lat long

const iss_api_URL = 'https://api.wheretheiss.at/v1/satellites/25544'; //the link to the data I am fetching

async function getISS() {
	const response = await fetch(iss_api_URL); //fetching the data from the API URL and placing into a response variable
	const data = await response.json(); //parses the APIs response in the JSON format so it can be used as a JS object
	const { latitude, longitude } = data; //destructuring the latitude and longitude values from the JSON response into their respective variables

	issMap.setView([latitude, longitude], issMap.getZoom()); //sets the view to current zoom level
	marker.setLatLng([latitude, longitude]); //updates marker position to current lat,long coords of ISS

	document.getElementById('lat').textContent = latitude.toFixed(5); //placing the lat and lon values as text into their IDed html tags
	document.getElementById('lon').textContent = longitude.toFixed(5);
} 

getISS(); //calling the function
setInterval(getISS, 2000); //calls getISS function every 2000 milliseconds