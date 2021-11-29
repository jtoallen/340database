/*
    SETUP
*/
//Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 10145;                 // Set a port number at the top so it's easy to change in the future

const util = require('util'); // implementation found on StackOverflow which allows promisify to be available with older versions of node
require('util.promisify').shim(); // Was receiving error when trying to test on osu servers
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
// https://stackoverflow.com/questions/46476741/nodejs-util-promisify-is-not-a-function

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// due to errors with POST requests, needed middleware for json
// CITED: https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

// Database
var mysql = require('./database/db-connector.js');
app.set('mysql', mysql);

//Express-Handlebars
const { engine } = require('express-handlebars');
const { query } = require('express');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));


app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Static Files
app.use(express.static('public'));

/*
    ROUTES
*/


app.get('/', function (req, res) {
    console.log('Rendering index page index page.');
    res.render('index');                                                      
});                                                         

app.get('/concession_items', function(req, res){
	selectQuery = "SELECT * FROM ConcessionItems";
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

app.post('/concession_items', function(req, res){
	insertQuery = "INSERT INTO `ConcessionItems`(`itemName`, `standardPrice`, `memberPrice`) VALUES (?, ?, ?)";
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

app.post('/concession_items_update', function(req, res){
	updateQuery = "UPDATE `ConcessionItems` SET `itemName` = (?), `standardPrice` = (?),`memberPrice`= (?) WHERE `itemID` = (?)";
	var mysql = req.app.get('mysql');
	var update = [req.body.itemName, req.body.standardPrice, req.body.memberPrice, req.body.itemID];
	mysql.pool.query(updateQuery, update, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/concession_items');
		}
	});
});

app.post('/concession_items_delete', function(req, res){
	delQuery = "DELETE FROM `ConcessionItems` WHERE `itemID` = (?)";
    delQueryTwo = "DELETE FROM MembersConcessions WHERE `itemID` = (?)";
    delQueryThree = "UPDATE `Members` SET `recentConcessionItem` = NULL WHERE `recentConcessionItem` = (?)";
	var mysql = req.app.get('mysql');
	var update = [req.body.itemID];
	mysql.pool.query(delQueryThree, update, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			mysql.pool.query(delQueryTwo, update, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    mysql.pool.query(delQuery, update, function(error, results, fields){
                        if(error){
                            res.write(JSON.stringify(error));
                            res.end();
                        } else {
                            res.redirect('/concession_items');
                        }
                    });
                }
            });
		}
	});
});


app.get('/films', function(req, res){
	console.log("routing to get /films");
    selectQuery = "SELECT * FROM Films";
	var context = {};
	mysql.pool.query(selectQuery, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.films = results;
		res.render('films', context);
	});
});

app.post('/films', function(req, res){
    console.log(req.body); //for debugging
	insertQuery = "INSERT INTO `Films`(`title`) VALUES (?)";
    var inserts = [req.body.filmTitle];
    console.log(inserts); // for debugging
	mysql.pool.query(insertQuery, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/films');
		}
	});
});

app.post('/films_update', function(req, res){
	updateQuery = "UPDATE `Films` SET `title` = (?) WHERE `filmID` = (?)";
	var update = [req.body.newTitle, req.body.filmID];
	mysql.pool.query(updateQuery, update, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/films');
		}
	});
});

app.post('/films_delete', function(req, res){
	delQuery = "DELETE FROM `Films` WHERE `filmID` = (?)";
    delQueryTwo = "DELETE FROM MembersFilms WHERE `filmID` = (?)";
    delQueryThree = "UPDATE `Members` SET `latestFilmViewed` = NULL WHERE `latestFilmViewed` = (?)";
	var del = [req.body.filmID];
	mysql.pool.query(delQueryThree, del, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			mysql.pool.query(delQueryTwo, del, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    mysql.pool.query(delQuery, del, function(error, results, fields){
                        if(error){
                            res.write(JSON.stringify(error));
                            res.end();
                        } else {
                            res.redirect('/films');
                        }
                    });
                }
            });
		}
	});
});

app.get('/members_concessions', function (req, res) {
    res.render('members_concessions')
});

app.get('/members_films', function (req, res) {
    res.render('members_films')
});

app.get('/members', function(req, res){
	selectQuery = "SELECT * FROM Members";
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

app.post('/members', function(req, res){
    console.log("routed to members"); // for debugging
	insertQuery = "INSERT INTO `Members`(`firstName`, `lastName`, `email`, `latestFilmViewed`, `recentConcessionItem`) VALUES (?, ?, ?, NULL, NULL)";
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

app.post('/members_update', function(req, res){
	updateQuery = "UPDATE `Members` SET `firstName`= (?),`lastName`= (?),`email`=(?) WHERE memberID = (?)";
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

app.post('/members_delete', function(req, res){
    console.log("routed to members_delete"); // for debugging
	delQuery = "DELETE FROM `Members` WHERE memberID = (?)";
    delQueryTwo = "DELETE FROM `MembersConcessions` WHERE memberID = (?)";
    delQueryThree = "DELETE FROM `MembersFilms` WHERE memberID = (?)";  
	var mysql = req.app.get('mysql');
	var update = [req.body.memberID];
	mysql.pool.query(delQueryThree, update, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			mysql.pool.query(delQueryTwo, update, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                } else {
                    mysql.pool.query(delQuery, update, function(error, results, fields){
                        if(error){
                            res.write(JSON.stringify(error));
                            res.end();
                        } else {
                            res.redirect('/members');
                        }
                    });
                }
            });
		}
	});
});

app.get('/sales_receipts', function(req, res){
	selectQuery = "SELECT * FROM SalesReceipts";
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query(selectQuery, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.sales_receipts = results;
		res.render('sales_receipts', context);
	});
});

app.post('/sales_receipts', function(req, res){
	var mysql = req.app.get('mysql');
    var insertQuery = "INSERT INTO `SalesReceipts`(`date`, `totalPaid`) VALUES (?, ?)";
    var inserts = [req.body.date, req.body.totalPaid];
	mysql.pool.query(insertQuery, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/sales_receipts');
		}
	});
});

app.post('/sales_receipts_update', function(req, res){
	var mysql = req.app.get('mysql');
    var updateQuery = "UPDATE `SalesReceipts` SET `date` = ?, `totalPaid` = ? WHERE `receiptID` = ?";
    var updates = [req.body.date, req.body.totalPaid, req.body.receiptId];
	mysql.pool.query(updateQuery, updates, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/sales_receipts');
		}
	});
});

app.post('/sales_receipts_delete', function(req, res){
	var mysql = req.app.get('mysql');
    var deleteQuery = "DELETE FROM `SalesReceipts` WHERE `ReceiptID` = ?";
	var deleteQueryTwo = "UPDATE MembersConcessions SET `ReceiptID` = NULL WHERE `ReceiptID` = ?";
	var deleteQueryThree = "UPDATE MembersFilms SET `ReceiptID` = NULL WHERE `ReceiptID` = ?";
    var deletes = [req.body.receiptId];
	mysql.pool.query(deleteQueryThree, deletes, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			mysql.pool.query(deleteQueryTwo, deletes, function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				} else {
					mysql.pool.query(deleteQuery, deletes, function(error, results, fields){
						if(error){
							res.write(JSON.stringify(error));
							res.end();
						} else {
							res.redirect('/sales_receipts');
						}
					});
				}
			});
		}
	});
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate. Wactching for changes with Nodemon')
});