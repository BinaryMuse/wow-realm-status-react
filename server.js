require('node-jsx').install({extension: '.jsx'});
var http = require('http');
var path = require('path')

var express = require('express');
var React = require('react');

var realmFetcher = require('./app/realm_fetcher');
var Page = require('./app/client/page');

var app = express();

app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.static(path.join(__dirname, '/public')));

app.get(/^\/(?!assets\/).*$/, function(req, res) {
  realmFetcher.server(function(err, data) {
    if (err) return res.json({error: err});

    var filter = req.path.substr(1);
    var props = {realms: data, filter: filter};
    var html = React.renderComponentToString(Page(props));
    res.render('index', { app: html, props: props });
  });
});

var port = process.env.PORT || 3000;

http.createServer(app).listen(port, function() {
  console.log("Listening on port " + port);
});
