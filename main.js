'use strict';

var
  app = require('express')(),
  path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get(/.*\.(html|js|css|json)/, function(req, res) {
  res.sendFile(path.join(__dirname + req.url));
});
app.get('/chat.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/chat.html'));
});

app.get('/load.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/load.js'));
});

app.get('/chat.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/chat.js'));
});

app.listen(3000);
console.log("Running server...");
