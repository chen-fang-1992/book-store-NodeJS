var db = require('./db');

function Book() {};

Book.findBookFromHome = function(key, content, callback) {
	db.findBookFromHome(key, content, function(err, books) {
		callback(err, books);
	});
};

Book.findBookByAdvanced = function(title, author, type, callback) {
	db.findBookByAdvanced(title, author, type, function(err, books) {
		callback(err, books);
	});
};

Book.findBookByRecommend = function(callback) {
	db.findBookByRecommend(function(err, books) {
		callback(err, books);
	});
};

module.exports = Book;