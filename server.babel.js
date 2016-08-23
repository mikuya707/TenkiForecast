'use strict'
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const ForecastIO = require('forecast-io')

app.use('/', express.static('./'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// app.set('DARK_SKY_API_KEY', "YOUR API KEY HERE")
// app.set('GOOGLE_API_KEY', "YOUR API KEY HERE")
console.log('dark api key', process.env.DARK_SKY_API_KEY)
console.log('google api key', process.env.GOOGLE_API_KEY)

const forecast = new ForecastIO(process.env.DARK_SKY_API_KEY)

app.post('/', function(req, res){
		var location = req.body.location;
		forecast
		    .latitude(location.latitude)           
		    .longitude(location.longitude)  
		    .units('ca')                    
		    .language('en')
		     .exclude('currently,minutely,hourly')                                
		    .get()        
		    .then(response => {   
		    	var res = JSON.parse(response)
		    	console.log('weather res is', res)

		        res.json(res.data.daily.data);
		    })
	    .catch(err => {                 
	        console.log(err)
	    })
					
		    

});




app.listen(process.env.PORT || 3000)