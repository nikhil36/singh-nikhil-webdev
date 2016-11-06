var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

app.set('port', (process.env.PORT || 5000));

console.log(process.env)

require("./assignment/app.js")(app);

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

