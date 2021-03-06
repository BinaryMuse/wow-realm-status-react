/** @jsx React.DOM */

var React = require('react');

var SearchBox = require('./search_box.jsx');
var LastUpdateBox = require('./last_update_box.jsx');
var ResetSearchBox = require('./reset_search_box.jsx');
var RealmList = require('./realm_list.jsx');
var realmFetcher = require('../realm_fetcher');

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
      if (event.state && event.state.filter)
        this.updateSearch(event.state.filter || '', true);
    }.bind(this);

    setInterval(function() {
      this.setState({loading: true});
      realmFetcher.client(function(data) {
        this.setState({realms: data, lastUpdate: new Date(), loading: false});
      }.bind(this));
    }.bind(this), 5 * 60 * 1000);
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
