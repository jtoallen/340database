/*
    SETUP
*/
//Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 7633;                 // Set a port number at the top so it's easy to change in the future

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
    res.render('index');                                                      
});                                                         

app.get('/concession_items', function (req, res) {
    res.render('concession_items')
});

app.get('/films', function (req, res) {
    res.render('films')
});

app.get('/members_concessions', function (req, res) {
    res.render('members_concessions')
});

app.get('/members_films', function (req, res) {
    res.render('members_films')
});

app.get('/members', function (req, res) {
    res.render('members')
});

app.get('/sales_receipts', function (req, res) {
    res.render('sales_receipts')
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate. Wactching for changes with Nodemon')
});