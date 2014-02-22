var React = require('react');
var Page = require('./app/client/page.jsx');

React.renderComponent(Page(window.props), document.getElementById('main'));
