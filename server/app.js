var express = require('express');
var path = require('path');
var fs = require("fs");
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var myConnect = require("express-myconnection");
var router = require("./routes/users");
var app = express();
var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'asd',
  port: 3306,
  database: 'amy'
};
//          <----    config  start   --->
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'users')));
app.use(myConnect(mysql,dbOptions,"single"));
//          <----    config  end   --->

app.get('/', function (req,res) {
  res.sendFile(__dirname + "/view/index.html");
});
app.get('/main', function (req,res) {
  res.sendFile(__dirname + "/view/users.html");
});
app.get('/viewPage',function (req,res) {
  var query = req.query;
  console.log(query)
  if(fs.existsSync("users/"+query.name)){
      res.sendFile(__dirname + "/users/"+query.name+"/project/index.html")
  }

});
app.get('/user',router.user);
app.get('/add',router.addDir);







// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.json({
//     message:err.message,
//     error:error
//   });
// });

module.exports = app;
