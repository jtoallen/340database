var express = require('express');
var router = express.Router();

router.get('/members', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT memberID, firstName, lastName, email, latestFilmViewed, recentConcessionItem FROM Members", function(error, results, fields) {
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
    var sql = "INSERT INTO `Members`(`firstName`, `lastName`, `email`, `latestFilmViewed`, `recentConcessionItem`) VALUES (?, ?, ?, NULL, NULL)";
	
    var inserts = [req.body.firstName, req.body.lastName, req.body.email];
	mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/members');
		}
	});
});