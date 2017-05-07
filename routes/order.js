var express = require('express');
var router = express.Router();
var order = require('../models/order');
var then = require('thenjs');

/* POST add page */
router.post('/add', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	var bid = req.body.bid;
	then(function(defer) {
		order.addRecord(uid, bid, "add", function(err) {
			if (err) {
				console.log('[error] - : ' + err);
			}
		});
		defer();
	}).then(function(defer) {
		order.addCart(uid, bid, function(err) {
			if (err) {
				console.log('[error] - : ' + err);
			} else {
				req.flash('successMsg', 'Add cart successfully.');
				res.redirect('/search/detail?bid='+bid);
			}
		});
	});
});

/* POST delete page */
router.post('/remove', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	var bid = req.body.bid;
	then(function(defer) {
		order.addRecord(uid, bid, "remove", function(err) {
			if (err) {
				console.log('[error] - : ' + err);
			}
		});
		defer();
	}).then(function(defer) {
		order.removeCart(uid, bid, function(err) {
			if (err) {
			} else {
				res.redirect('/user/cart');
			}
		});
	});
});

/* POST update page */
router.post('/update', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	var bid = req.body.bid;
	var number = req.body.number;
	order.updateCart(uid, bid, number, function(err) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			res.redirect('/user/cart');
		}
	});
});

/* POST checkout page */
router.post('/checkout', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	var bids = req.body.bids.split(',');
	then(function(defer) {
		bids.forEach(function(bid) {
			order.removeCart(uid, bid, function(err) {
				if (err) {
					console.log('[error] - : ' + err);
				}
			});
		});
		defer();
	}).then(function(defer) {
		bids.forEach(function(bid) {
			order.addRecord(uid, bid, "check", function(err) {
				if (err) {
					console.log('[error] - : ' + err);
				}
			});
		});
		defer();
	}).then(function(defer) {
		res.redirect('/user/cart');
	});
});

function isAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('failMsg','You are not logged in.');
		res.redirect('/login');
	}
}

module.exports = router;