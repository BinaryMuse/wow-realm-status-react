/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  displayName: 'SearchBox',

  render: function() {
    return (
      <p id='search'>
        {'Search: '}
        <input type='text' size='30' onChange={this.onChange} value={this.props.filter} />
        <span id='loading'>
          {this.props.loading ? <img alt='loading' src='/assets/images/loading.gif' /> : null}
        </span>
      </p>
    );
  },

  onChange: function(event) {
    this.props.updateSearch(event.target.value);
  }
});
