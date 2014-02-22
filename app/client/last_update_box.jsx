/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  displayName: 'LastUpdateBox',

  render: function() {
    return (
      <p id='time'>
        Last updated:{' '}
        <span>
          {this.formatDate(this.props.lastUpdate)}
        </span><br />
        <em>Data updates every 5 minutes</em>
      </p>
    );
  },

  formatDate: function(date) {
    return date ? 'sometime!' : 'never'
  }
});
