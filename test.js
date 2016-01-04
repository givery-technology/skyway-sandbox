const
  Browser = require('zombie'),
  assert = require('chai');

Browser.localhost('localhost', 3000);

describe('User visits index page', function() {
  const clientA = new Browser();
  const clientB = new Browser();

  before(function(done) {
    clientA.visit('/', function () {
      clientB.visit('/', done);
    });
  });

  describe('window', function() {
    it('exists', function() {
      assert.isDefined(window, 'window is defined');
    });
  });
  describe('XMLHttpRequest', function() {
    it('Not exsits as global variable', function() {
      assert.isUndefined(XMLHttpRequest, 'window is defined');
    });
    it('exists as window property', function() {
      assert.isDefined(window.XMLHttpRequest, 'window is defined');
    });
    it('has overrideMimeType', function() {
      var request = new window.XMLHttpRequest();
      assert.isFunction(request.overrideMimeType);
    });
  });

  describe('Make connection', function() {
    before(function(done) {
      browser
        .pressButton('Connect!!', done);
    });
    it ('should have Way object', function() {
      browser.dump(Way);
    });
  });
});
