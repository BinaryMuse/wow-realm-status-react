/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  displayName: 'ResetSearchBox',

  render: function() {
    return (
      <p id='reset'>
        <a href='/' onClick={this.onClick}>Show All</a>
      </p>
    );
  },

  onClick: function(event) {
    event.preventDefault();
    this.props.updateSearch('');
  }
});
