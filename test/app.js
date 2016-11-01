var Application = require('spectron').Application;
var assert = require('assert');

var platform_name = process.platform.match(/win/) ? process.platform : 'linux';

if(platform_name.match(/linux|darwin/)) {
// Only run this on Mac or Linux
console.log("Running on.."+ platform_name);

describe('application launch', function () {
  this.timeout(1*60/6*1000)
  var app;

  beforeEach(function () {
    console.log("Before each starts", process.cwd());
    var path_bar = './dist/Contableio-'+platform_name+'-x64/Contableio' + ( (platform_name === 'darwin') ? '.app/Contents/MacOS/Contableio' : '' );
    app = new Application({
      path: path_bar
    });
    console.log("About to return", path_bar);
    console.log("See __dirname", __dirname);
    return app.start();
  })

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  it('shows an initial window', function () {
    return app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1);
    })
  })
})
}
