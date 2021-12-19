const express = require('express')
var subdomain = require('express-subdomain');
const app = express()
var path = require('path')
const session = require('express-session')
const https = require('https')
const fs = require('fs')


const port = process.env.PORT || '3000';

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'pl;aksjf;op 833;ajsnf'
}))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//test if it checks full URL or only the domain
app.get('/diffpath', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//check if it complies with autocomplete=off attribute
app.get('/autocompleteoff', function(req, res) {
    res.sendFile(path.join(__dirname + '/noautocomplete.html'));
});

//see what happens with a different action
app.get('/diffaction', function(req, res) {
    res.sendFile(path.join(__dirname + '/diffaction.html'));
});

//if action changed by malicious javascript
app.get('/diffactiontwo', function(req, res) {
    res.sendFile(path.join(__dirname + '/diffactiontwo.html'));
});

//Tests for form actions from Stock
app.get('/formone', function(req, res) {
    res.sendFile(path.join(__dirname + '/formone.html'));
});

app.get('/formtwo', function(req, res) {
    res.sendFile(path.join(__dirname + '/formtwo.html'));
});

app.get('/formthree', function(req, res) {
    res.sendFile(path.join(__dirname + '/formthree.html'));
});

app.get('/formfour', function(req, res) {
    res.sendFile(path.join(__dirname + '/formfour.html'));
});

app.get('/formfive', function(req, res) {
    res.sendFile(path.join(__dirname + '/formfive.html'));
});
//Tests for form actions from Stock

app.get('/vulnerable', function(req, res) {
    res.sendFile(path.join(__dirname + '/vulnerable.html'));
});

app.get('/blitz', function(req, res) {
    res.sendFile(path.join(__dirname + '/blitz.html'));
});

app.get('/invisible', function(req, res) {
    res.sendFile(path.join(__dirname + '/invisiblelogin.html'));
});

app.get('/csrf', function(req, res) {
    res.sendFile(path.join(__dirname + '/csrf.html'));
});

app.get('/same', function(req, res) {
    res.sendFile(path.join(__dirname + '/same-origin.html'));
});

app.get('/sameh', function(req, res) {
    res.sendFile(path.join(__dirname + '/same-origin-hid.html'));
});
app.get('/sameop', function(req, res) {
    res.sendFile(path.join(__dirname + '/same-origin-opacity.html'));
});

app.get('/cross', function(req, res) {
    res.sendFile(path.join(__dirname + '/cross-origin.html'));
});

app.get('/crossh', function(req, res) {
    res.sendFile(path.join(__dirname + '/cross-origin-hid.html'));
});

app.get('/crossop', function(req, res) {
    res.sendFile(path.join(__dirname + '/cross-origin-opacity1.html'));
});

app.post('/submit', function(req, res) {
    req.session.user = 'User'; //need to set session user for PWM to trigger and save password
    res.sendFile(path.join(__dirname + '/page.html'));
    //res.redirect(path.join(__dirname + '/page.html'));
});

/*SUBDOMAIN CODE*/
var router = express.Router();

//api specific routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/submit', function(req, res) {
    req.session.user = 'User'; //need to set session user for PWM to trigger and save password
    res.sendFile(path.join(__dirname + '/page.html'));
    //res.redirect(path.join(__dirname + '/page.html'));
});

app.use(subdomain('mail', router));
app.use(subdomain('accounts', router));

// 0 = HTTP
// 1 = HTTPS with valid cert
// else HTTPS invalid cert
var x = 0;

if (x == 0) {

    app.listen(port, () => console.log(`Example app listening on  http://localhost:${port}`));

} else if (x == 1) {

    const httpsOptions = {
        key: fs.readFileSync('./ssl/server.key'),
        cert: fs.readFileSync('./ssl/server.cert')
    }
    const server = https.createServer(httpsOptions, app).listen(port, () => {
        console.log('server running at ' + port)
    })
    server.listen(port, () => console.log(`Example app listening on  http://localhost:${port}`));

} else {

    const httpsOptions = {
        key: fs.readFileSync('./localhost.key'),
        cert: fs.readFileSync('./localhost.crt')
    }
    const server = https.createServer(httpsOptions, app).listen(port, () => {
        console.log('server running at ' + port)
    })
    server.listen(port, () => console.log(`Example app listening on  http://localhost:${port}`));

}