/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');

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
    return date ? moment(date).format("MMM d, h:mm A") : 'never';
  }
});
