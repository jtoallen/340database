var express = require('express');
var router = express.Router();

router.get('/members_concessions', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT memberID, firstName, lastName, email, latestFilmViewed, recentConcessionItem FROM MembersConcessions", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.members_concessions = results;
		res.render('members_concessions', context);
	});
});

router.post('/members_concessions', function(req, res){
	var mysql = req.app.get('mysql');
    var sql = "INSERT INTO `MembersConcessions`(`receiptID`, `filmID`, `memberID`, `quantityPurchased`) VALUES (NULL, ?, ?, ?)";
    var sql_two = "UPDATE `Members` SET `latestFilmViewed`= (?) WHERE `memberID` = (?)";
    var sql_three = "not done yet";
    var sql_four = "not done yet"
    var inserts = [req.body.filmID, req.body.memberID, req.body.quantityPurchased];
    var latest_film = [req.body.filmID, req.body.memberID]
	mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			mysql.pool.query(sql_two,latest_film,function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    res.redirect('/members_concessions');
                }
            });
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