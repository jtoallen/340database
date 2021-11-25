var express = require('express');
var router = express.Router();

selectQuery = "SELECT * FROM Members";
insertQuery = "INSERT INTO `Members`(`firstName`, `lastName`, `email`, `latestFilmViewed`, `recentConcessionItem`) VALUES (?, ?, ?, NULL, NULL)";
updateQuery = "UPDATE `Members` SET `firstName`= (?),`lastName`= (?),`email`=(?) WHERE memberID = (?)";

router.get('/members', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query(selectQuery, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.members = results;
		res.render('members', context);
	});
});

router.post('/members', function(req, res){
	var mysql = req.app.get('mysql');
    var inserts = [req.body.firstName, req.body.lastName, req.body.email];
	mysql.pool.query(insertQuery, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/members');
		}
	});
});

router.put('/members', function(req, res){
	var mysql = req.app.get('mysql');
	var update = [req.body.firstName, req.body.lastName, req.body.email, req.body.memberID];
	mysql.pool.query(updateQuery, update, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/members');
		}
	});
});