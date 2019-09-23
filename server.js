var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    console.log('get route', req.testing);
    res.end();
});

app.get('/subscriber', (req, res, next) => {
    res.render('subscriber');
});

app.get('/publisher', (req, res, next) => {
    res.render('publisher');
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        // console.log(msg);
        expressWs.getWss().clients.forEach(element => {
            if (element === ws) {
                console.log("skip sender");
            } else {
                element.send(msg);
            }
        });
    });
});

app.listen(3000);