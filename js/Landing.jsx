const React = require('react')
const { Link } = require('react-router')

const Landing = () => (
  <div className='app-container'>
    <div className='home-info'>
      <h1 className='title'>天気 forcast</h1>
      <input className='search' type='text' placeholder='Search' />
    </div>
  </div>
)

module.exports = Landing
