var express = require('express');
var bodyParser = require('body-parser'); // Body Parser for incoming POST requests
var app = express();
var http = require('http').Server(app); // HTTP Lib from Node, pass in express App
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var messages = [
//    {name: 'Seong', message: 'Hi there'},
//    {name: 'Jane', message: 'Hello!'}
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('User Connected');
});

var server = http.listen(3000, () => {
    console.log('Server is listening on port: ', server.address().port);
});