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

Order.listCartByUid = function(uid, callback) {
	db.listCartByUid(uid, function(err, books) {
		callback(err, books);
	});
};

Order.addRecord = function(uid, bid, action, callback) {
	db.addRecord(uid, bid, action, function(err) {
		callback(err);
	});
};

Order.listRecordByUid = function(uid, callback) {
	db.listRecordByUid(uid, function(err, records) {
		callback(err, records);
	});
};

Order.listRecordFromAdmin = function(key, content, callback) {
	db.listRecordFromAdmin(key, content, function(err, records) {
		callback(err, records);
	});
}

module.exports = Order;