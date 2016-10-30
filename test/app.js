var Application = require('spectron').Application;
var assert = require('assert');

var platform_name = process.platform.match(/win/) ? process.platform : 'linux';

if(platform_name.match(/linux|darwin/)) {
// Only run this on Mac or Linux
console.log("Running on.."+ platform_name);

describe('application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: './dist/Contableio-'+platform_name+'-x64/Contableio' + ( (platform_name === 'darwin') ? '.app/Contents/MacOS/Contableio' : '' )
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
    })
  })
})
}
