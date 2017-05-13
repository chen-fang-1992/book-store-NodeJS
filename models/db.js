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

// var pool = db.createPool({
// 	host: "localhost",
// 	user: "root",
// 	password: "",
// 	port: "3306",
// 	database: "book_store",
// 	connnectionLimit: 10
// });

var pool = db.createPool({
	host: "us-cdbr-iron-east-03.cleardb.net",
	user: "bdf782ebcf2a86",
	password: "9bfd0a96",
	port: "3306",
	database: "heroku_2a90ac33c166360",
	connnectionLimit: 10
});

DB.listBookByRecommend = function(callback) {
	pool.getConnection(function(err, conn) {
		conn.query(LIST_BOOK_BY_RECOMMEND, function(err, books) {
			callback(err, books);
		});
		conn.release();
	});
};

DB.countPagesOfBookFromHome = function(key, content, callback) {
	pool.getConnection(function(err, conn) {
		switch (key) {
			case "Title":
				conn.query(COUNT_BOOK_BY_TITLE, content, function(err, num) {
					callback(err, Math.ceil(num[0].num/7));
				});
				break;
			case "Author":
				conn.query(COUNT_BOOK_BY_AUTHOR, content, function(err, num) {
					callback(err, Math.ceil(num[0].num/7));
				});
				break;
			case "Type":
				conn.query(COUNT_BOOK_BY_TYPE, content, function(err, num) {
					callback(err, Math.ceil(num[0].num/7));
				});
				break;
		}
		conn.release();
	});
};

DB.findBookFromHome = function(key, content, page, callback) {
	pool.getConnection(function(err, conn) {
		page = (page - 1) * 7;
		switch (key) {
			case "Title":
				conn.query(FIND_BOOK_BY_TITLE+page+",7", content, function(err, books) {
					callback(err, books);
				});
				break;
			case "Author":
				conn.query(FIND_BOOK_BY_AUTHOR+page+",7", content, function(err, books) {
					callback(err, books);
				});
				break;
			case "Type":
				conn.query(FIND_BOOK_BY_TYPE+page+",7", content, function(err, books) {
					callback(err, books);
				});
				break;
		}
		conn.release();
	});
};

DB.findBookById = function(id, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(FIND_BOOK_BY_ID, id, function(err, books) {
			callback(err, books[0]);
		});
		conn.release();
	});
};

DB.countPagesOfBookFromAdvanced = function(title, author, type, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(COUNT_BOOK_BY_ADVANCED, [title, author, type], function(err, num) {
			callback(err, Math.ceil(num[0].num/7));
		});
		conn.release();
	});
};

DB.findBookFromAdvanced = function(title, author, type, page, callback) {
	pool.getConnection(function(err, conn) {
		page = (page - 1) * 7;
		conn.query(FIND_BOOK_BY_ADVANCED+page+",7", [title, author, type], function(err, books) {
			callback(err, books);
		});
		conn.release();
	});
};

DB.register = function(username, password, email, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(ADD_USER, [username, password, email], function(err) {
			callback(err, "success");
		});
		conn.release();
	});
};

DB.authenticateUsername = function(username, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(AUTHENTICATE_USERNAME, username, function(err, users) {
			if (users[0]) {
				callback(err, "fail");
			} else {
				callback(err, "success");
			}
		});
		conn.release();
	});
};

DB.authenticateLogin = function(username, password, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(AUTHENTICATE_LOGIN, [username, password], function(err, users) {
			callback(err, users[0]);
		});
		conn.release();
	});
};

DB.findUserByUid = function(uid, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(FIND_USER_BY_UID, uid, function(err, users) {
			callback(err, users[0]);
		});
		conn.release();
	});
};

DB.addCart = function(uid, bid, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(ADD_CART, [uid, bid, 1], function(err) {
			callback(err);
		});
		conn.release();
	});
};

DB.removeCart = function(uid, bid, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(REMOVE_CART, [uid, bid], function(err) {
			callback(err);
		});
		conn.release();
	});
};

DB.updateCart = function(uid, bid, number, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(UPDATE_CART, [number, uid, bid], function(err) {
			callback(err);
		});
		conn.release();
	});
};

DB.findCart = function(uid, bid, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(FIND_CART, [uid, bid], function(err, carts) {
			callback(err, carts[0]);
		});
		conn.release();
	});
};

DB.countCartByUid = function(uid, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(COUNT_CART_BY_UID, uid, function(err, num) {
			callback(err, Math.ceil(num[0].num/5));
		});
		conn.release();
	});
};

DB.listCartByUid = function(uid, page, callback) {
	pool.getConnection(function(err, conn) {
		page = (page - 1) * 5;
		conn.query(LIST_CART_BY_UID+page+",5", uid, function(err, books) {
			callback(err, books);
		});
		conn.release();
	});
};

DB.addRecord = function(uid, bid, action, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(ADD_RECORD, [uid, bid, action], function(err) {
			callback(err);
		});
		conn.release();
	});
};

DB.countRecordByUid = function(uid, callback) {
	pool.getConnection(function(err, conn) {
		conn.query(COUNT_RECORD_BY_UID, uid, function(err, num) {
			callback(err, Math.ceil(num[0].num/5));
		});
		conn.release();
	});
};

DB.listRecordByUid = function(uid, page, callback) {
	pool.getConnection(function(err, conn) {
		page = (page - 1) * 5;
		conn.query(LIST_RECORD_BY_UID+page+",5", uid, function(err, records) {
			callback(err, records);
		});
		conn.release();
	});
};

DB.countRecordFromAdmin = function(key, content, callback) {
	pool.getConnection(function(err, conn) {
		switch (key) {
			case "User Name":
				conn.query(COUNT_RECORD_BY_USERNAME, content, function(err, num) {
					callback(err, Math.ceil(num[0].num/5));
				});
				break;
			case "Book Title":
				conn.query(COUNT_RECORD_BY_TITLE, content, function(err, num) {
					callback(err, Math.ceil(num[0].num/5));
				});
				break;
		}
		conn.release();
	});
};

DB.listRecordFromAdmin = function(key, content, page, callback) {
	pool.getConnection(function(err, conn) {
		page = (page - 1) * 5;
		switch (key) {
			case "User Name":
				conn.query(LIST_RECORD_BY_USERNAME+page+",5", content, function(err, records) {
					callback(err, records);
				});
				break;
			case "Book Title":
				conn.query(LIST_RECORD_BY_TITLE+page+",5", content, function(err, records) {
					callback(err, records);
				});
				break;
		}
		conn.release();
	});
};

module.exports = DB;