var db = require('./db');

function Book() {};

Book.listBookByRecommend = function(callback) {
	db.listBookByRecommend(function(err, books) {
		callback(err, books);
	});
};

Book.countPagesOfBookFromHome = function(key, content, callback) {
	db.countPagesOfBookFromHome(key, content, function(err, num) {
		callback(err, num);
	});
};

Book.findBookFromHome = function(key, content, page, callback) {
	db.findBookFromHome(key, content, page, function(err, books) {
		callback(err, books);
	});
};

Book.findBookById = function(id, callback) {
	db.findBookById(id, function(err, book) {
		callback(err, book);
	});
};

Book.countPagesOfBookFromAdvanced = function(title, author, type, callback) {
	db.countPagesOfBookFromAdvanced(title, author, type, function(err, num) {
		callback(err, num);
	});
};

Book.findBookFromAdvanced = function(title, author, type, page, callback) {
	db.findBookFromAdvanced(title, author, type, page, function(err, books) {
		callback(err, books);
	});
};

module.exports = Book;