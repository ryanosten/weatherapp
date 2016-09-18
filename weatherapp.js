//this nodejs app takes in a zip code in the command line, and prints out the current weather and temperature
//to run app, you must have node installed. From the command line run "node weatehrapp.js {zip/postal code}"

var zip = process.argv[2];
var https = require('https');


function printMessage(summary, temp){
	console.log("The weather is currently " + summary.toLowerCase() + " with a temperature of " + temp + " degrees fahrenheit");
}

//connect to a google maps API to convert zip to lat/long
var request = https.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyBrInQqHvJUCTnQxnnbxFDfX4M1nA5HDoA", function(response){
	
	var body = ""
	//read the data
	response.on('data', function(chunk){
		body += chunk;
	});
	
	response.on('end', function(){
		//parse the data into JSON
		var googleMapsParse = JSON.parse(body);
		//store lat and long
		var lat = (googleMapsParse.results[0].geometry.location.lat);
		var long = (googleMapsParse.results[0].geometry.location.lng);

		//connect to forecast API and pass lat and long as param
		var request = https.get("https://api.forecast.io/forecast/2d80c206d85b83471589f39dfcb76b8d/" + lat + "," + long, function(response){
			
			var body = "";
			//read data
			response.on('data', function(chunk){
				body += chunk;
			});

			//parse data into JSON
			response.on('end', function(){
				var forecastData = JSON.parse(body);
				//store current weather and temp
				var currentWeather = forecastData.currently.summary;
				var currentTemp = forecastData.currently.temperature;
				
				//print out the current weather bitches
				printMessage(currentWeather, currentTemp);
			});
		});
	});
});








//call forecast api with lat long
//parse results and print weather forecast to console
