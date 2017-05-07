var express = require('express');
var router = express.Router();
var order = require('../models/order');
var then = require('thenjs');

/* POST add page */
router.post('/add', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	var bid = req.body.bid;
	order.addCart(uid, bid, function(err) {
		if (err) {
		} else {
			req.flash('successMsg', 'Add cart successfully.');
			res.redirect('/search/detail?bid='+bid);
		}
	});
});

/* POST delete page */
router.post('/remove', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	var bid = req.body.bid;
	order.removeCart(uid, bid, function(err) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			res.redirect('/user/cart');
		}
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
	then.series([
		function() {
			bids.forEach(function(bid) {
				order.removeCart(uid, bid, function(err) {
					if (err) {
						console.log('[error] - : ' + err);
					}
				});
			});
		},
		function() {
			res.redirect('/user/cart');
		}
	]);
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