const React = require('react')
const axios = require('axios')
const {Switch} = require('react-toolbox/lib/switch');



var TempSetting = React.createClass({
  getInitialState: function() {
    return {
      unit_c: false,
      temperature: 2
    };
  },

  componentDidMount: function() {
    var api_key = prod_config.DARK_SKY.API_KEY
  },

  componentWillUnmount: function() {
    // this.serverRequest.abort();
  },
  handleChange: function(field, value){
      this.setState({unit_c: !this.state.unit_c})
  },
  changeUnit: function(){
    // var c = Weather.cache;
      
      // // Toggle temp unit type on click
      // if ( c.showFahrenheit === false ) {
      //   $('#temp').html(c.fahrenheit);
      //   c.showFahrenheit = true;
      // } else {
      //   $('#temp').html(c.celcius);
      //   c.showFahrenheit = false;
      // }
      
      // // Toggles the button knob
      // $('#unit-toggle').toggleClass('toggle');
      // // Creates the fade in effect on the temp text
      // $('#temp').toggleClass('toggle');
  },

  render: function() {
    return (
      <div> 
      <span>c</span>
        <Switch
          checked={this.state.unit_c}
          label="f"
          onChange={this.handleChange.bind(this, 'unit_c')}
        />
    </div> 
      // <div>
      //   {this.state.username}'s last gist is
      //   <a href={this.state.lastGistUrl}>here</a>.
      // </div>
    );
  }
});

module.exports = TempSetting;