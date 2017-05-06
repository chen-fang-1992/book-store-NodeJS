var db = require('./db');

function User() {};

User.register = function(username, password, email, callback) {
	db.authenticateUsername(username, function(err, info) {
		if (info == "fail") {
			callback(err, info);
		} else {
			db.register(username, password, email, function(err, info) {
				callback(err, info);
			});
		}
	});
};

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