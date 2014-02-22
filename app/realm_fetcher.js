var jsonget = require('jsonget');

module.exports = function(callback) {
  jsonget('http://us.battle.net/api/wow/realm/status', {}, function(err, data) {
    if (err) return callback(err);
    callback(null, data.realms);
  });
};
