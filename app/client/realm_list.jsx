/** @jsx React.DOM */

var React = require('react');

var RealmListItem = require('./realm_list_item.jsx');

module.exports = React.createClass({
  displayName: 'RealmList',

  render: function() {
    var realmItems = this.props.realms
      .filter(this.filterRealms(this.props.filter))
      .map(this.generateRealmItem)

    return (
      <div>
        {realmItems}
      </div>
    );
  },

  filterRealms: function(substr) {
    substr = substr.toLowerCase();

    return function(realm) {
      var name = realm.name.toLowerCase();
      var slug = realm.slug.toLowerCase();
      return name.indexOf(substr) > -1 || slug.indexOf(substr) > -1;
    }
  },

  generateRealmItem: function(realm, index) {
    return <RealmListItem key={realm.slug} realm={realm} updateSearch={this.props.updateSearch} />
  }
});
