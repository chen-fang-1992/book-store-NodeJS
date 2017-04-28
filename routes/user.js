var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/user', function(req, res) {
	res.render('user', {
		title:'Welcome',
		navbar:[{mp:'',as:'',cu:'',ul:'',al:''}]
	});
});

module.exports = router;