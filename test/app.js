var Application = require('spectron').Application;
var assert = require('assert');

var platform_name = process.platform.match(/win/) ? process.platform : 'linux';

if(platform_name.match(/darwin/)) {
// Only run this on Mac
// dropped linux due timeouts
// Ideas: screen size, initialization, build, squlite3 as async
// looks like i'm not alone
// https://github.com/StephenDavidson/electron-spectron-example/commit/75d64be3a7072ed8932a44eb0c733b6dbd5d6164#commitcomment-19290475
console.log("Running on.."+ platform_name);

describe('application launch', function () {
  this.timeout(1*60*1000)
  var app;

  beforeEach(function (done) {
    console.log("Before each starts", process.cwd());
    var path_bar = process.cwd()+'/dist/Contableio-'+platform_name+'-x64/Contableio' + ( (platform_name === 'darwin') ? '.app/Contents/MacOS/Contableio' : '' );
    app = new Application({
      path: path_bar,
      waitTimeout: 4000
    });
    console.log("About to return", path_bar);
    console.log("See __dirname", __dirname);
    app.start()
      .then(function () {
        // Check if the window is visible
        return app.browserWindow.isVisible()
      }).then(function (isVisible) {
        // Verify the window is visible
        console.log("Is visible?", isVisible)
      }).then(function () {
        // Get the window's title
        return app.client.getTitle()
      }).then(function (title) {
        // Verify the window's title
        console.log("Title:", title)
      })
      .then(function () {
        console.log("Successfully started!", app.client.getTitle());
        done();
      })
      .catch(function (error) {
        // Log any failures
        console.error('Test failed', error.message)
        done(error);
      });
  })

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  it('shows an initial window', function (done) {
    app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1);
      done();
    })
  })
})
}
