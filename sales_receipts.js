var express = require('express');
var router = express.Router();

router.get('/sales_receipts', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT receiptID, date, totalPaid FROM SalesReceipts", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.sales_receipts = results;
		res.render('sales_receipts', context);
	});
});

router.post('/sales_receipts', function(req, res){
	var mysql = req.app.get('mysql');
    var sql = "INSERT INTO `SalesReceipts`(`date`, `totalPaid`) VALUES (CURRENT_DATE(), ?";
	
    var inserts = [req.body.totalPaid];
	mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/sales_receipts');
		}
	});
});

module.exports = router;