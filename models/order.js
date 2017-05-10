var db = require('./db');

function Order() {};

Order.addCart = function(uid, bid, callback) {
	db.findCart(uid, bid, function(err, cart) {
		if (cart) {
			db.updateCart(uid, bid, cart.number+1, function(err) {
				callback(err);
			});
		} else {
			db.addCart(uid, bid, function(err) {
				callback(err);
			});
		}
	});
};

Order.removeCart = function(uid, bid, callback) {
	db.removeCart(uid, bid, function(err) {
		callback(err);
	});
};

Order.updateCart = function(uid, bid, number, callback) {
	db.updateCart(uid, bid, number, function(err) {
		callback(err);
	})
};

Order.countCartByUid = function(uid, callback) {
	db.countCartByUid(uid, function(err, num) {
		callback(err, num);
	});
};

Order.listCartByUid = function(uid, page, callback) {
	db.listCartByUid(uid, page, function(err, books) {
		callback(err, books);
	});
};

Order.addRecord = function(uid, bid, action, callback) {
	db.addRecord(uid, bid, action, function(err) {
		callback(err);
	});
};

Order.countRecordByUid = function(uid, callback) {
	db.countRecordByUid(uid, function(err, num) {
		callback(err, num);
	});
};

Order.listRecordByUid = function(uid, page, callback) {
	db.listRecordByUid(uid, page, function(err, records) {
		callback(err, records);
	});
};

Order.countRecordFromAdmin = function(key, content, callback) {
	db.countRecordFromAdmin(key, content, function(err, records) {
		callback(err, records);
	});
};

Order.listRecordFromAdmin = function(key, content, page, callback) {
	db.listRecordFromAdmin(key, content, page, function(err, records) {
		callback(err, records);
	});
};

module.exports = Order;