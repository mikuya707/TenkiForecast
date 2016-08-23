const React = require('react')
const { Link } = require('react-router')
const CurrentLocation = require('./CurrentLocation')
const WeatherCards = require('./WeatherCards')
const UnitSelector = require('./UnitSelector')

const Landing = () => (
  <div className='Weather'>
    <div className='home-info'>
      <h1 className='title'>天気 forecast</h1>
      <CurrentLocation />
      <UnitSelector />
      <div className="weather-cards">
		<WeatherCards />
      </div>
    </div>
  </div>
)

module.exports = Landing
