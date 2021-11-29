var express = require('express');
var router = express.Router();

router.get('/concession_items', function (req, res) {
    var context = {};
    var mysql = req.app.get('mysql');
    mysql.pool.query("SELECT itemID as id, itemName, standardPrice, memberPrice FROM ConcessionItems", function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        context.concession_items = results;
        res.render('concession_items', context);
    });
});

router.post('/concession_items', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO `ConcessionItems`(`itemName`, `standardPrice`, `memberPrice`) VALUES (?, ?, ?)";

    var inserts = [req.body.itemName, req.body.standardPrice, req.body.memberPrice];
    mysql.pool.query(sql, inserts, function (error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.redirect('/concession_items');
        }
    });
});