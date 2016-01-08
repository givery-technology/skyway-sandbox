'use strict';

var
  app = require('express')(),
  path = require('path');

app.set('port', (process.env.PORT || 3000));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get(/.*\.(html|js|css|json)/, function(req, res) {
  res.sendFile(path.join(__dirname + req.url));
});

app.listen(app.get('port'), function () {
  console.log('Server is running on port', app.get('port'));
});
