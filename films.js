var express = require('express');
var router = express.Router();

router.get('/films', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT filmID, title FROM Films", function(error, results, fields) {
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
    var sql = "INSERT INTO `Films`(`title`) VALUES (?)";
	
    var inserts = [req.body.title];
	mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/films');
		}
	});
});