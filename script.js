const iss_api_URL = 'https://api.wheretheiss.at/v1/satellites/25544'; //the link to the data I am fetching

async function getISS() {
	const response = await fetch(iss_api_URL); //fetching the data from the API URL and placing into a response variable
	const data = await response.json(); //parses the APIs response in the JSON format so it can be used as a JS object
	const { latitude, longitude } = data; //destructuring the latitude and longitude values from the JSON response into their respective variables

	document.getElementById('lat').textContent = latitude; //placing the lat and lon values as text into their IDed html tags
	document.getElementById('lon').textContent = longitude;

	//logging the function data in the browser console
	console.log(data);
	console.log(latitude);
	console.log(longitude);
} 

getISS(); //calling the function