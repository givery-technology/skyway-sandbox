(function (global, exports, undefined) {
  'use strict';
  loadJson('./specifications/env.json', function (env) {
    exports.env = env;
  });
  var
    apikey = "",
    dummy = "mummy";
    //peer = new Peer({key: apikey});
  console.log(this.env);
})(this, {})
