/** @jsx React.DOM */

var React = require('react');

var SearchBox = require('./search_box.jsx');
var LastUpdateBox = require('./last_update_box.jsx');
var ResetSearchBox = require('./reset_search_box.jsx');
var RealmList = require('./realm_list.jsx');

module.exports = React.createClass({
  displayName: 'Page',

  getInitialState: function() {
    return {
      loading: false,
      lastUpdate: new Date(),
      filter: this.props.filter,
      realms: this.props.realms
    };
  },

  componentDidMount: function() {
    window.onpopstate = function(event) {
      var filter = event.state && event.state.filter;
      this.updateSearch(filter || '', true);
    }.bind(this);
  },

  render: function() {
    var resetBox;
    if (this.state.filter.length)
      resetBox = <ResetSearchBox updateSearch={this.updateSearch} />

    return (
      <div>
        <SearchBox
          filter={this.state.filter}
          updateSearch={this.updateSearch}
          loading={this.state.loading} />
        <LastUpdateBox
          lastUpdate={this.state.lastUpdate} />
        {resetBox}
        <RealmList
          realms={this.state.realms}
          filter={this.state.filter}
          updateSearch={this.updateSearch} />
      </div>
    );
  },

  updateSearch: function(filter, skipHistory) {
    filter = filter || '';
    var lastFilter = this.state.filter;
    if (Math.abs(filter.length - lastFilter.length) <= 1) skipHistory = true;
    if (skipHistory)
      window.history.replaceState({filter: filter}, '', '/' + filter);
    else
      window.history.pushState({filter: filter}, '', '/' + filter);
    this.setState({filter: filter});
  }
});
