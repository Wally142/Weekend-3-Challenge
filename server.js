var express = require('express');
var path = require('path');
var app = express();
var port = 5000;
var bodyParser = require('body-parser')
var index = require('./routes/index');
var task = require('./routes/task');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', index);
app.use('/task', task);


app.listen( port, function(){
    console.log('serve it up on', port);
});