const React = require('react')
const {Radio, RadioGroup} = require('react-radio-group')
const UIService = require('./services/UIService')

var UnitSelector = React.createClass({
getInitialState: function() {
	return {
	  selectedValue: 'c'
	};
},
handleChange: function(e){
	this.setState({selectedValue: e})
	UIService.setUnit(e);

},
render: function() {

  return (
    <div className="unit-selector">
    	<RadioGroup name="unit" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
		   <span className="selector-label"><Radio value="c" />  Celsius</span>
		   <span className="selector-label"><Radio value="f" />  Fahrenheit</span>
		</RadioGroup>
    </div>
    
  );
}
});

module.exports = UnitSelector;