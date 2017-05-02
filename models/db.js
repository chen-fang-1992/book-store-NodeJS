var db = require('mysql');

const FIND_BOOK_BY_RECOMMEND = "select * from books order by rand() limit 5";
const FIND_BOOK_BY_TITLE = "select * from books where title like concat('%',?,'%')";
const FIND_BOOK_BY_AUTHOR = "select * from books where authors like concat('%',?,'%')";
const FIND_BOOK_BY_TYPE = "select * from books where publication_type like concat('%',?,'%')";
const FIND_BOOK_BY_ID = "select * from books where bid=?";
const FIND_BOOK_BY_ADVANCED = "select * from books where title like concat('%',?,'%')" +
		" and authors like concat('%',?,'%') and publication_type like concat('%',?,'%')";

const AUTHENTICATE_LOGIN = "select * from users where username=? and password=?";
const FIND_USER_BY_UID = "select * from users where uid=?";

function DB() {
	this.connection;
};

DB.con = function() {
	this.connection = db.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		port: "3306",
		database: "book_store"
	});
	this.connection.connect();
};

DB.end = function() {
	this.connection.end();
};

DB.findBookByRecommend = function(callback) {
	this.con();
	this.connection.query(FIND_BOOK_BY_RECOMMEND, function(err, books) {
		callback(err, books);
	});
	this.end();
};

DB.findBookFromHome = function(key, content, callback) {
	this.con();
	switch (key) {
		case "Title":
			this.connection.query(FIND_BOOK_BY_TITLE, content, function(err, books) {
				callback(err, books);
			});
			break;
		case "Author":
			this.connection.query(FIND_BOOK_BY_AUTHOR, content, function(err, books) {
				callback(err, books);
			});
			break;
		case "Type":
			this.connection.query(FIND_BOOK_BY_TYPE, content, function(err, books) {
				callback(err, books);
			});
			break;
	}
	this.end();
};

DB.findBookById = function(id, callback) {
	this.con();
	this.connection.query(FIND_BOOK_BY_ID, id, function(err, books) {
		callback(err, books[0]);
	});
	this.end();
};

DB.findBookByAdvanced = function(title, author, type, callback) {
	this.con();
	this.connection.query(FIND_BOOK_BY_ADVANCED, [title, author, type], function(err, books) {
		callback(err, books);
	});
	this.end();
};

DB.authenticateLogin = function(username, password, callback) {
	this.con();
	this.connection.query(AUTHENTICATE_LOGIN, [username, password], function(err, users) {
		callback(err, users[0]);
	});
	this.end();
};

DB.findUserByUid = function(uid, callback) {
	this.con();
	this.connection.query(FIND_USER_BY_UID, uid, function(err, users) {
		callback(err, users[0]);
	});
	this.end();
};

module.exports = DB;