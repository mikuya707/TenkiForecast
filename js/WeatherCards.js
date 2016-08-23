const React = require('react')
const axios = require('axios')
const UIService = require('./services/UIService')
const WeatherCard = require('./WeatherCard')
const moment = require('moment')
const Loading = require('react-loading-animation');



var WeatherCards = React.createClass({
  getInitialState: function() {
    return {
      location: {
        latitude: 46.3,
        longitude: -121.2,
        city: 'Seattle',
        country: 'USA',
      },
      unit: 'c',
      daily: []
    };
  },

  componentDidMount: function() {
    this.locationSubscription = UIService.geolocObservable.subscribe((loc) => {
            if(loc) {
                this.setState({location: loc}, this.retriveWeatherData);

         }
       }, (err) => console.log('err is', err))
        
    this.unitSubscription = UIService.unitObservable.subscribe((u) => {
        if(u){
          if(this.state.unit == 'c' && u !== this.state.unit){
                this.state.daily.map((daily) =>{
                    var currentMax = daily.temperatureMax;
                  var currentMin = daily.temperatureMin;
                     daily.temperatureMax = Number(currentMax * 1.8 + 32).toFixed(2);
                     daily.temperatureMin = Number(currentMin * 1.8 + 32).toFixed(2);
                })
               this.setState({unit: u, daily: this.state.daily})
           }
          else if(this.state.unit == 'f' && u !== this.state.unit){
             this.state.daily.map((daily) =>{
                  var currentMax = daily.temperatureMax;
                  var currentMin = daily.temperatureMin;
                    daily.temperatureMax = Number((currentMax -32) / 1.8).toFixed(2);
                    daily.temperatureMin = Number((currentMin -32) / 1.8).toFixed(2);
                })
               this.setState({unit: u, daily: this.state.daily})

          }
          
        }
    })
  
  },

  retriveWeatherData: function(loc, unit){
     axios.post('/', {location: this.state.location, unit: this.state.unit})
                 .then((res)=> {
                      this.setState({daily: res});
                  
                 
          })
  },

  componentWillUnmount: function() {
    this.locationSubscription && this.locationSubscription.dispose();
    this.unitSubscription && this.unitSubscription.dispose();
  },

  render: function() {
    var currentTime = Date.now()
    if(this.state.daily){
      cards = this.state.daily.map((daily, idx) => {
                var temperature = {max: daily.temperatureMax, min: daily.temperatureMin};
              return (
                      <WeatherCard key={idx} temp={temperature}
                        date={moment(currentTime).add(idx, 'day').format('dddd, MMMM Do YYYY')}
                        icon={daily.icon}
                        description={daily.summary} />
                  )
              })
   }

    if (this.state.daily.length == 0) return <Loading />;
    
    return (
      <div className="weather-cards">
         {cards}
      </div>
      
    );
  }
});

module.exports = WeatherCards;