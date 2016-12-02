var express = require('express');
// var session       = require('express-session');
// var passport      = require('passport');
// var cookieParser  = require('cookie-parser');


var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(session({secret: process.env.SESSION_SECRET}));
//
// app.use(passport.initialize());
// app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

app.set('port', (process.env.PORT || 5000));

console.log(process.env)

require("./assignment/app.js")(app);
// require("./project/app.js")(app);

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

