var express = require('express');
var router = express.Router();

router.get('/members_films', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT orderID, receiptID, filmID, memberID, quantityPurchased FROM MembersFilms", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.members_films = results;
		res.render('members_films', context);
	});
});

router.post('/members_films', function(req, res){
	var mysql = req.app.get('mysql');
    var sql = "INSERT INTO MembersFilms(receiptID, filmID, memberID, quantityPurchased) VALUES (NULL, ?, ?, ?)";
    var sql_two = "UPDATE Members SET latestFilmViewed= (?) WHERE memberID = (?);"
    var sql_three = "INSERT INTO `SalesReceipts`(`date`, `totalPaid`) VALUES (CURRENT_DATE(), (9.99 * (SELECT quantityPurchased FROM MembersFilms WHERE memberID = (?) ORDER BY orderID DESC LIMIT 1)))";
    var sql_four = "SELECT receiptID FROM SalesReceipts ORDER BY receiptID DESC LIMIT 1"
    var inserts = [req.body.filmID, req.body.memberID, req.body.quantityPurchased];
    var latest_film = [req.body.filmID, req.body.memberID];
    var new_receipt = [req.body.memberID]
	mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
    });
	mysql.pool.query(sql_two,latest_film,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
    });
    /* mysql.pool.query(sql_three,new_receipt,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
    });
    new_receipt_id = {} */
    /* mysql.pool.query(sql_four, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        new_receipt_id.receiptID = results
    });	 */
});

module.exports = router;