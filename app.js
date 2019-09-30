var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

const Multer = require('multer');
// API
var api_users = require('./routes/api/users');
var api_tasks = require('./routes/api/tasks');
var api_vendor = require('./routes/api/vendor');
var api_last_location = require('./routes/api/last_location');
var api_photo = require('./routes/api/photo'); 

// BackEnd
var routes = require('./routes/index'); 
var login = require('./routes/login'); 
var user = require('./routes/users'); 
var task = require('./routes/tasks'); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session setup
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
// app.use(express.static(path.join(__dirname, 'uploads/task')));
// app.use(express.static(path.join(__dirname, 'uploads/profile')));
// app.use(express.static(path.join(__dirname, 'uploads/payment_slip')));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser());
// app.use(bodyParser({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// API
app.use('/api/users', api_users);
app.use('/api/tasks', api_tasks);
app.use('/api/vendor', api_vendor);
app.use('/api/last_location', api_last_location);
app.use('/api/photo', api_photo);



// BackEnd

app.use('/', routes);
app.use('/login', login);
app.use('/user', user);
app.use('/task', task);


// test cron job
//https://www.npmjs.com/package/node-cron
var cron = require('node-cron');
var _ = require("underscore"); // สำหรับทำ filter
/** EX. */
/*
var filtered = _.where(response.data, {transaction: "trxn_test_5bmxt7j968obmcpq08d"}); 
*/
// cron.schedule('* * * * *', function(){
//   console.log('running a task every minute');
// });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
