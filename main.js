var Way = (function (global, document, exports, undefined) {
  'use strict';
  loadJson('./specifications/env.json', function (env) {
    console.log('environment loaded');
    var
      apikey = env.SKYWAY_API_KEY,
      peer = exports.peer = new Peer({key: apikey}),
      connections = exports.connections = [],
      display = document.getElementById('chat-display'),
      message = document.getElementById('chat-message');

    document.getElementById('peer-connect').onclick = function peerConnect (event) {
      peer.listAllPeers(function (list) {
        var others = list.filter(function (p, idx) {
          return p !== peer.id;
        });
        console.log('List all Peers', list);
        console.log('List other Peers', others);
        others.forEach(function (p) {
          exports.connections.push(peer.connect(p));
        });
      });
    };
    document.getElementById('chat-send').onclick = function sendMessage (event) {
      console.log("Message text:", message.value);
      connections.forEach(function (conn) {
        console.log("Sending message to:", conn.peer);
        conn.send(message.value);
      });
    };

    peer.on('open', function (id) {
      console.log('Peer opened with ID:', id);
    }).on('close', function () {
      console.log('Peer connection closed');
    }).on('connection', function (conn) {
      console.log('Peer connected:', conn);
      conn.on('open', function () {
        console.log('Connection opened');
      }).on('close', function () {
        console.log('Connection closed');
      }).on('data', function (data) {
        console.log('Connection data received', data);
      }).on('error', function (err) {
        console.log('Connection error occurred', err);
      });
    }).on('error', function (err) {
      console.log('Peer error occurred:', err);
    });
  });
  return exports;
})(this, this.document, {})

console.log(Way);
