var Sandbox = (function (global, document, exports, undefined) {
  'use strict';
  exports.CLASS_CHAT_FROM = 'from-them';
  exports.CLASS_CHAT_TO   = 'to-them';

  function chat_from (display, text, from) {
    var chat = document.createElement('span');
    chat.textContent = from +' : '+ text;
    chat.className = ['chat', exports.CLASS_CHAT_FROM].join(' ');
    display.appendChild(chat);
  }
  function chat_to (display, text, to) {
    var chat = document.createElement('span');
    chat.textContent = to +' : '+ text;
    chat.className = ['chat', exports.CLASS_CHAT_TO].join(' ');
    display.appendChild(chat);
  }
  loadJson('./specifications/env.json', function (env) {
    console.log('environment loaded');
    var
      apikey = env.SKYWAY_API_KEY,
      peer = exports.peer = new Peer({key: apikey}),
      connections = {},
      display = exports.display = document.getElementById('chat-display'),
      message = document.getElementById('chat-message');

    document.getElementById('peer-connect').onclick = function peerConnect (event) {
      function add (pid) {
        if (!connections[pid]) {
          var conn = connections[pid] = peer.connect(pid);
          conn.on('data', function (data) {
            console.log("Recieve:", message.value);
            chat_from(display, data.message, data.from);
          });
        }
      }
      peer.listAllPeers(function (list) {
        console.log(list);
        list.forEach(add);
      });
    };

    document.getElementById('chat-send').onclick = function sendMessage (event) {
      function send (conn) {
        conn.send({
          from: peer.id,
          to: conn.peer,
          message: message.value
        });
        chat_to(display, message.value, conn.peer);
      }
      // Send message
      console.log("Send:", message.value);
      Object.keys(connections).forEach(function (pid) {
        send(connections[pid]);
      });
    };

    peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        console.log("Recieve text:", message.value);
        chat_from(display, data.message, data.from);
      });
    });

  });
  return exports;
})(this, this.document, {})

console.log(Sandbox);
