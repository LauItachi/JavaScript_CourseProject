var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user_manager = require('./public/javascript/user_manager');

var session = require('express-session'); //add

var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//需要添加的
app.use(session({
    secret:'an',
    resave:false,
    saveUninitialized:true
}));

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
    res.sendfile('./public/2048.html');
});
app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/user',function(req,res){
    if(req.body.type==="login"){
        user.login(req.body.userid,req.body.password,function(msg){
            res.send(msg);
        });
    }
    else if(req.body.type==="register"){
        user.register(req.body.username, req.body.password,function(msg){
            res.send(msg);
        });
    }
});


module.exports = app;
