/*
    SETUP
*/
//Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 10145;                 // Set a port number at the top so it's easy to change in the future

const util = require('util');
require('util.promisify').shim();
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
// implementation found on StackOverflow which allows promisify to be available with older versions of node
// Was receiving this error when trying to test on osu servers
// https://stackoverflow.com/questions/46476741/nodejs-util-promisify-is-not-a-function


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

const films = require('./films.js');
const concession_items = require('./concession_items.js');
const members = require('./members.js');
const members_concessions = require('./members_concessions.js');
const members_films = require('./members_concessions.js');
const sales_receipts = require('./sales_receipts.js');
app.use(films);
app.use(concession_items);
app.use(members);
app.use(members_concessions);
app.use(members_films);
app.use(sales_receipts);

/*
    ROUTES
*/
// app.js

app.get('/', function (req, res) {
    console.log('Rendering index page index page.');
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