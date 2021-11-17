/*
    SETUP
*/
//Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 7634;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

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
// app.js

app.get('/', function (req, res) {
    // let query1 = "SELECT * FROM DDL_SSS.sql;";               // Define our query
    // console.log(query1);

    // db.pool.query(query1, function (error, rows, fields) {    // Execute the query

    res.render('index');                  // Render the index.hbs file, and also send the renderer
    // })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.get('/concession_items', function (req, res) {
    let query1 = "SELECT itemID, itemName, memberPrice FROM ConcessionItems";
    db.pool.query(query1, function (err, rows, fields) {
        res.render('concession_items', { data: rows })
    })
});

app.get('/films', function (req, res) {
    let query1 = "SELECT filmID, title FROM Films";
    db.pool.query(query1, function (err, rows, fields) {
        res.render('films', { data: rows });
    })
});

app.get('/members_concessions', function (req, res) {
    let query1 = "SELECT transactionID, receiptID, itemID, memberID, quantityPurchased from MembersConcessions";
    db.pool.query(query1, function (err, rows, fields) {
        res.render('members_concessions', { data: rows });
    })
});

app.get('/members_films', function (req, res) {
    let query1 = "SELECT orderID, receiptID, filmID, memberID, quantityPurchased FROM MembersFilms";
    db.pool.query(query1, function (err, rows, fields) {
        res.render('members_films', { data: rows });
    })
});

app.get('/members', function (req, res) {
    let query1 = "SELECT memberID, firstName, lastName, email, latestFilmViewed, recentConcessionItem FROM Members";
    db.pool.query(query1, function (err, rows, fields) {
        res.render('members', { data: rows });
    })
});

app.get('/sales_receipts', function (req, res) {
    let query1 = "SELECT receiptID, date, totalPaid FROM SalesReceipts";
    db.pool.query(query1, function (err, rows, fields) {
        res.render('sales_receipts', { data: rows });
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate. Wactching for changes with Nodemon')
});
