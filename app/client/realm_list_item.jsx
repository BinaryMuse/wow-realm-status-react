/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  displayName: 'RealmListItem',

  render: function() {
    var realm = this.props.realm;

    return (
      <div>
        <h1><a href={this.hrefFor(realm)} onClick={this.onClick}>{realm.name}</a>{' '}
          ({this.realmType(realm.type)})</h1>
          <p>
            Status: {this.status(realm.status)}<br />
            Population: {this.population(realm.population)}<br />
            Queue: {this.queue(realm.queue)}
          </p>
      </div>
    );
  },

  hrefFor: function(realm) {
    return '/' + realm.slug;
  },

  realmType: function(type) {
    switch (type) {
    case "pve":
      return "PvE";
      break;
    case "pvp":
      return "PvP";
      break;
    case "rp":
      return "RP";
      break;
    case "rppvp":
      return "RP PvP";
      break;
    }
  },

  status: function(bool) {
    return bool ? 'Up' : 'Down';
  },

  queue: function(bool) {
    return bool ? 'Yes ' : 'No';
  },

  population: function(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  },

  onClick: function(event) {
    event.preventDefault();
    this.props.updateSearch(this.props.realm.name);
  }
});
