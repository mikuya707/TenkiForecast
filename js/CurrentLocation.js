
const React = require('react')
const axios = require('axios')
const UIService = require('./services/UIService')


var CurrentLocation = React.createClass({
	getInitialState: function(){
		return {
			currentPosition: "",
			city: "",
			country: "",

		}
	},

	componentDidMount: function(){
		
		navigator.geolocation.getCurrentPosition((position) => { 	
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;

			// var api_key = process.env.GOOGLE_API_KEY;
			var latlng = lat+"," + lng;
			axios.get('/key').then((res) => {
				console.log('get res', res)
				var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key="+ res.key
				axios.get(url).then((result) => {
					if(result){
						console.log('result for location data is', result)
						var addr = result.data.results[0].formatted_address
						var data = addr.split(',')
						var city = data[1]
						var country = data[3]
						UIService.setLocation({latitude: lat, longitude: lng, city, country});
						this.setState({city, country})			
				}
				
    		})
			})
			
			
		}, function(err){
			console.log('what is err',err);
		})
    	

	},

	render(){
		return (
			<div className="location">
				<span>{this.state.city}</span>
				<span>{this.state.country}</span>
			</div>
		)
	}
})

module.exports = CurrentLocation