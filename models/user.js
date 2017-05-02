var db = require('./db');

function User() {};

User.authenticateLogin = function(username, password, callback) {
	db.authenticateLogin(username, password, function(err, user) {
		callback(err, user);
	});
};

User.findUserByUid = function(uid, callback) {
	db.findUserByUid(uid, function(err, user) {
		callback(err, user);
	});
};

module.exports = User;