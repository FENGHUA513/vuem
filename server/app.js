var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('express-cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var list = require('./routes/list');


// 链接MongoDB数据库,数据库的名称叫list
mongoose.connect('mongodb://127.0.0.1:27017/list');

// 连接成功操作
mongoose.connection.on("connected",function(){
	console.log("数据库连接成功")
})

// 连接失败操作
mongoose.connection.on("error",function(){
	console.log("MongoDB connected fail.")
})

// 连接断开操作
mongoose.connection.on("disconnected",function(){
	console.log("MongoDB connected disconnected.")
})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(cors({
    allowedOrigins: [
        'http://172.17.5.165:8080'
    ]
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', list)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
