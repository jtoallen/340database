var express = require('express');
var router = express.Router();

selectQuery = "SELECT * FROM ConcessionItems";
insertQuery = "INSERT INTO `ConcessionItems`(`itemName`, `standardPrice`, `memberPrice`) VALUES (?, ?, ?)";
updateQuery = "UPDATE `ConcessionItems` SET `standardPrice` = (?),`memberPrice`= (?) WHERE `itemName` = (?)";

router.get('/concession_items', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query(selectQuery, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.concession_items = results;
		res.render('concession_items', context);
	});
});

router.post('/concession_items', function(req, res){
	var mysql = req.app.get('mysql');
    var inserts = [req.body.itemName, req.body.standardPrice, req.body.memberPrice];
	mysql.pool.query(insertQuery, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/concession_items');
		}
	});
});

router.put('/concession_items', function(req, res){
	var mysql = req.app.get('mysql');
	var update = [req.body.standardPrice, req.body.memberPrice, req.body.itemName];
	mysql.pool.query(updateQuery, update, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/concession_items');
		}
	});
});

module.exports = router;