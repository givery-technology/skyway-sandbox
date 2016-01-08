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

app.listen(3000);
console.log("Running server...");
