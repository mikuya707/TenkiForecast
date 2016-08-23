const React = require('react')

var Unit = React.createClass({

render: function() {

  return (
    <div className="unit">
        <img className="unit-icon" src={'../public/images/' + this.props.unit + '.svg'} />
    </div>
    
  );
}
});

module.exports = Unit;