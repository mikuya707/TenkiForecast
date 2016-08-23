const React = require('react');
const Unit = require('./Unit');
const UIService = require('./services/UIService');

var WeatherCard = React.createClass({
getInitialState: function(){
  return{
    unit: 'c'
  }
},
componentDidMount: function(){
  this.unitSubscription = UIService.unitObservable.subscribe((u) => {
        if(u){
          this.setState({unit: u})
        }
    })
},
componentWillUnmount: function(){
      this.unitSubscription && this.unitSubscription.dispose();

},
render: function() {
  var iconName = this.props.icon.toUpperCase().replace(/[-]/g, '_');
  var date = this.props.date.split(',');

  return (
    <div className="card">
        <p className="dd">{date[0]}</p>
        <p className="d-m-y">{date[1]}</p>
        <p className="desc">{this.props.description}</p>
        <div className="icons">
           <img className="icon" src={'../public/images/' + iconName + '.svg'} />
        </div>
        <div className="temp-container">
          <div className='temperature'>
            <span className="temp-degree">Max {this.props.temp.max}</span><Unit unit={this.state.unit} />
          </div>
          <div className='temperature'>
              <span className="temp-degree">Min {this.props.temp.min}</span><Unit unit={this.state.unit} />
          </div>
        </div>

    </div>
    
  );
}
});

module.exports = WeatherCard;