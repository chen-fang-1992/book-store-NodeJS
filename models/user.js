var db = require('./db');

function User() {};

User.authenticateLogin = function(username, password, callback) {
	db.authenticateLogin(username, password, function(err, users) {
		callback(err, users[0]);
	});
};

User.findUserByUid = function(uid, callback) {
	db.findUserByUid(uid, function(err, users) {
		callback(err, users[0]);
	});
};

module.exports = User;