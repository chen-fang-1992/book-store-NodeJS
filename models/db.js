var db = require('mysql');

const LIST_BOOK_BY_RECOMMEND = "SELECT * FROM BOOKS ORDER BY RAND() LIMIT 10";
const COUNT_BOOK_BY_TITLE = "SELECT COUNT(*) AS num FROM BOOKS WHERE TITLE LIKE CONCAT('%',?,'%')";
const COUNT_BOOK_BY_AUTHOR = "SELECT COUNT(*) AS num FROM BOOKS WHERE AUTHORS LIKE CONCAT('%',?,'%')";
const COUNT_BOOK_BY_TYPE = "SELECT COUNT(*) AS num FROM BOOKS WHERE TYPE LIKE CONCAT('%',?,'%')";
const FIND_BOOK_BY_TITLE = "SELECT * FROM BOOKS WHERE TITLE LIKE CONCAT('%',?,'%') LIMIT ";
const FIND_BOOK_BY_AUTHOR = "SELECT * FROM BOOKS WHERE AUTHORS LIKE CONCAT('%',?,'%') LIMIT ";
const FIND_BOOK_BY_TYPE = "SELECT * FROM BOOKS WHERE PUBLICATION_TYPE LIKE CONCAT('%',?,'%') LIMIT ";
const FIND_BOOK_BY_ID = "SELECT * FROM BOOKS WHERE BID=?";
const COUNT_BOOK_BY_ADVANCED = "SELECT COUNT(*) AS num FROM BOOKS WHERE TITLE LIKE CONCAT('%',?,'%')" +
		" AND AUTHORS LIKE CONCAT('%',?,'%') AND PUBLICATION_TYPE LIKE CONCAT('%',?,'%')";
const FIND_BOOK_BY_ADVANCED = "SELECT * FROM BOOKS WHERE TITLE LIKE CONCAT('%',?,'%')" +
		" AND AUTHORS LIKE CONCAT('%',?,'%') AND PUBLICATION_TYPE LIKE CONCAT('%',?,'%') LIMIT ";

const ADD_USER = "INSERT INTO USERS (USERNAME,PASSWORD,EMAIL) VALUES (?,?,?)";
const AUTHENTICATE_USERNAME = "SELECT * FROM USERS WHERE USERNAME=?";
const AUTHENTICATE_LOGIN = "SELECT * FROM USERS WHERE USERNAME=? AND PASSWORD=?";
const FIND_USER_BY_UID = "SELECT * FROM USERS WHERE UID=?";

const ADD_CART = "INSERT INTO CART (UID,BID,NUMBER) VALUES (?,?,?)";
const REMOVE_CART = "DELETE FROM CART WHERE UID=? AND BID=?";
const UPDATE_CART = "UPDATE CART SET NUMBER=? WHERE UID=? AND BID=?";
const FIND_CART = "SELECT * FROM CART WHERE UID=? AND BID=?";
const COUNT_CART_BY_UID = "SELECT COUNT(*) AS num FROM CART WHERE CART.UID=?";
const LIST_CART_BY_UID = "SELECT BOOKS.BID AS bid,BOOKS.TITLE AS title,CART.NUMBER AS number" +
		" FROM CART LEFT JOIN BOOKS ON  CART.BID=BOOKS.BID AND CART.UID=? LIMIT ";
const ADD_RECORD = "INSERT INTO RECORD (UID,BID,ACTION) VALUES (?,?,?)";
const COUNT_RECORD_BY_UID = "SELECT COUNT(*) AS num FROM RECORD WHERE RECORD.UID=?";
const LIST_RECORD_BY_UID = "SELECT BOOKS.BID AS bid,BOOKS.TITLE AS title,RECORD.ACTION AS action," +
		"DATE_FORMAT(RECORD.TIMESTAMP,'%Y-%m-%d %H:%i:%s') AS time FROM RECORD LEFT JOIN BOOKS ON" +
		" RECORD.BID=BOOKS.BID WHERE RECORD.UID=? ORDER BY RECORD.RID DESC LIMIT ";
const COUNT_RECORD_BY_USERNAME = "SELECT COUNT(*) AS num FROM RECORD LEFT JOIN USERS ON RECORD.UID=USERS.UID" +
		" WHERE USERS.USERNAME=?";
const LIST_RECORD_BY_USERNAME = "SELECT USERS.USERNAME AS username,BOOKS.TITLE AS title,RECORD.ACTION AS action," +
		"DATE_FORMAT(RECORD.TIMESTAMP,'%Y-%m-%d %H:%i:%s') AS time FROM RECORD LEFT JOIN USERS ON RECORD.UID=USERS.UID" +
		" LEFT JOIN BOOKS ON RECORD.BID=BOOKS.BID WHERE USERS.USERNAME=? ORDER BY RECORD.RID DESC LIMIT ";
const COUNT_RECORD_BY_TITLE = "SELECT COUNT(*) AS num FROM RECORD LEFT JOIN BOOKS ON RECORD.BID=BOOKS.BID" +
		" WHERE BOOKS.TITLE LIKE CONCAT('%',?,'%')";
const LIST_RECORD_BY_TITLE = "SELECT USERS.USERNAME AS username,BOOKS.TITLE AS title,RECORD.ACTION AS action," +
		"DATE_FORMAT(RECORD.TIMESTAMP,'%Y-%m-%d %H:%i:%s') AS time FROM RECORD LEFT JOIN USERS ON RECORD.UID=USERS.UID" +
		" LEFT JOIN BOOKS ON RECORD.BID=BOOKS.BID WHERE BOOKS.TITLE LIKE CONCAT('%',?,'%') ORDER BY RECORD.RID DESC LIMIT ";

function DB() {};

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

DB.listBookByRecommend = function(callback) {
	this.con();
	this.connection.query(LIST_BOOK_BY_RECOMMEND, function(err, books) {
		callback(err, books);
	});
	this.end();
};

DB.countPagesOfBookFromHome = function(key, content, callback) {
	this.con();
	switch (key) {
		case "Title":
			this.connection.query(COUNT_BOOK_BY_TITLE, content, function(err, num) {
				callback(err, Math.ceil(num[0].num/7));
			});
			break;
		case "Author":
			this.connection.query(COUNT_BOOK_BY_AUTHOR, content, function(err, num) {
				callback(err, Math.ceil(num[0].num/7));
			});
			break;
		case "Type":
			this.connection.query(COUNT_BOOK_BY_TYPE, content, function(err, num) {
				callback(err, Math.ceil(num[0].num/7));
			});
			break;
	}
	this.end();
};

DB.findBookFromHome = function(key, content, page, callback) {
	page = (page - 1) * 7;
	this.con();
	switch (key) {
		case "Title":
			this.connection.query(FIND_BOOK_BY_TITLE+page+",7", content, function(err, books) {
				callback(err, books);
			});
			break;
		case "Author":
			this.connection.query(FIND_BOOK_BY_AUTHOR+page+",7", content, function(err, books) {
				callback(err, books);
			});
			break;
		case "Type":
			this.connection.query(FIND_BOOK_BY_TYPE+page+",7", content, function(err, books) {
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

DB.countPagesOfBookFromAdvanced = function(title, author, type, callback) {
	this.con();
	this.connection.query(COUNT_BOOK_BY_ADVANCED, [title, author, type], function(err, num) {
		callback(err, Math.ceil(num[0].num/7));
	});
	this.end();
};

DB.findBookFromAdvanced = function(title, author, type, page, callback) {
	page = (page - 1) * 7;
	this.con();
	this.connection.query(FIND_BOOK_BY_ADVANCED+page+",7", [title, author, type], function(err, books) {
		callback(err, books);
	});
	this.end();
};

DB.register = function(username, password, email, callback) {
	this.con();
	this.connection.query(ADD_USER, [username, password, email], function(err) {
		callback(err, "success");
	});
	this.end();
};

DB.authenticateUsername = function(username, callback) {
	this.con();
	this.connection.query(AUTHENTICATE_USERNAME, username, function(err, users) {
		if (users[0]) {
			callback(err, "fail");
		} else {
			callback(err, "success");
		}
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

DB.addCart = function(uid, bid, callback) {
	this.con();
	this.connection.query(ADD_CART, [uid, bid, 1], function(err) {
		callback(err);
	});
	this.end();
};

DB.removeCart = function(uid, bid, callback) {
	this.con();
	this.connection.query(REMOVE_CART, [uid, bid], function(err) {
		callback(err);
	});
	this.end();
};

DB.updateCart = function(uid, bid, number, callback) {
	this.con();
	this.connection.query(UPDATE_CART, [number, uid, bid], function(err) {
		callback(err);
	});
	this.end();
};

DB.findCart = function(uid, bid, callback) {
	this.con();
	this.connection.query(FIND_CART, [uid, bid], function(err, carts) {
		callback(err, carts[0]);
	});
	this.end();
};

DB.countCartByUid = function(uid, callback) {
	this.con();
	this.connection.query(COUNT_CART_BY_UID, uid, function(err, num) {
		callback(err, Math.ceil(num[0].num/5));
	});
	this.end();
};

DB.listCartByUid = function(uid, page, callback) {
	page = (page - 1) * 5;
	this.con();
	this.connection.query(LIST_CART_BY_UID+page+",5", uid, function(err, books) {
		callback(err, books);
	});
	this.end();
};

DB.addRecord = function(uid, bid, action, callback) {
	this.con();
	this.connection.query(ADD_RECORD, [uid, bid, action], function(err) {
		callback(err);
	});
	this.end();
};

DB.countRecordByUid = function(uid, callback) {
	this.con();
	this.connection.query(COUNT_RECORD_BY_UID, uid, function(err, num) {
		callback(err, Math.ceil(num[0].num/5));
	});
	this.end();
};

DB.listRecordByUid = function(uid, page, callback) {
	page = (page - 1) * 5;
	this.con();
	this.connection.query(LIST_RECORD_BY_UID+page+",5", uid, function(err, records) {
		callback(err, records);
	});
	this.end();
};

DB.countRecordFromAdmin = function(key, content, callback) {
	this.con();
	switch (key) {
		case "User Name":
			this.connection.query(COUNT_RECORD_BY_USERNAME, content, function(err, num) {
				callback(err, Math.ceil(num[0].num/5));
			});
			break;
		case "Book Title":
			this.connection.query(COUNT_RECORD_BY_TITLE, content, function(err, num) {
				callback(err, Math.ceil(num[0].num/5));
			});
			break;
	}
	this.end();
};

DB.listRecordFromAdmin = function(key, content, page, callback) {
	page = (page - 1) * 5;
	this.con();
	switch (key) {
		case "User Name":
			this.connection.query(LIST_RECORD_BY_USERNAME+page+",5", content, function(err, records) {
				callback(err, records);
			});
			break;
		case "Book Title":
			this.connection.query(LIST_RECORD_BY_TITLE+page+",5", content, function(err, records) {
				callback(err, records);
			});
			break;
	}
	this.end();
};

module.exports = DB;