
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/users');
var gamelistApi = require('./routes/api/v1/gamelists');
var usersApi = require('./routes/api/v1/users');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');

var app = express();

// development only
app.configure('development', function () {
    //if ('development' == app.get('env')) {
    var env = require('node-env-file');
    
    app.use(express.errorHandler());
    env(__dirname + '/dev.env');
});

var db = monk(process.env.CONNECTION_STRING || '');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(function (req, res, next) {
    req.db = db;
    next();
});
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.get('/users', user.list);

app.get('/api/v1/gamelists', gamelistApi.list);
app.get('/api/v1/users', usersApi.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
