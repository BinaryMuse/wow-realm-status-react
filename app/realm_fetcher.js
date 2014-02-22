var superagent;
var jsonpReq = 0;

module.exports = {
  server: function(callback) {
    superagent = superagent || require('superagent');
    superagent.get('http://us.battle.net/api/wow/realm/status').end(function(err, res) {
      if (err) return callback(err);
      callback(null, res.body.realms);
    });
  },

  client: function(callback) {
    jsonpReq++;
    window['wow_api_jsonp_' + jsonpReq] = function(data) {
      callback(data.realms);
    };

    var url = 'http://us.battle.net/api/wow/realm/status?jsonp=wow_api_jsonp_' + jsonpReq;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  }
};
