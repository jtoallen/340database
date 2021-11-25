var express = require('express');
var router = express.Router();

selectQuery = "SELECT * FROM Members";
insertQuery = "INSERT INTO `Films`(`title`) VALUES (?)";
updateQuery = "UPDATE `Films` SET `title` = (?) WHERE `title` = (?)";

router.get('/films', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query(selectQuery, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.films = results;
		res.render('films', context);
	});
});

router.post('/films', function(req, res){
	var mysql = req.app.get('mysql');
    var inserts = [req.body.title];
	mysql.pool.query(insertQuery, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/films');
		}
	});
});

router.put('/films', function(req, res){
	var mysql = req.app.get('mysql');
	var update = [req.body.newTitle, req.body.oldTitle];
	mysql.pool.query(updateQuery, update, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/films');
		}
	});
});