var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var minifyHTML   = require('express-minify-html');

// DB Code
var mongo       = require('mongodb');
var monk        = require('monk');
var db          = monk('localhost:27017/polca');

var index       = require('./routes/index');
var newsletter  = require('./routes/newsletter');
var festi       = require('./routes/festi');
var bouchons    = require('./routes/bouchons');
 
var app = express();

// view engine setup
app.set('views', [
    path.join(__dirname + '/views'),
    path.join(__dirname + '/views/shared') ]
); 


app.set('view engine', 'ejs');

// Bower & Nodes
app.use('/bower_components', express.static(__dirname + '/bower_components')); 
app.use('/js', express.static(__dirname + '/public/js')); 
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Compress HTML
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));

// Make the db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);

// NEWSLETTER
app.get('/newsletter', newsletter.load);  
app.post('/newsletter', newsletter.post);  

// CONCOURS FESTIVAL
app.get('/festi', festi.load);  
app.post('/festi', festi.post);  

// CONCOURS BOUCHONS
app.get('/bouchons', bouchons.load);  
app.post('/bouchons', bouchons.post); 


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

app.listen(3000);
console.log('POLCA is running');