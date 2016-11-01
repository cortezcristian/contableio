#!/usr/bin/env bash

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  export DISPLAY=:99.0
  sh -e /etc/init.d/xvfb start
  sleep 3
  /sbin/start-stop-daemon --start --quiet --pidfile /tmp/custom_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 1280x1024x16
  echo "Starting xvfb..."
fi

node --version
npm --version

npm install -g bower@1.7.7 mocha electron-packager
npm install
if [[ "$TRAVIS_OS_NAME" == "linux" ]]
then
  electron-packager . --out=dist --asar --overwrite --platform=linux
  ls -al dist/Contableio-linux-x64
else
  electron-packager . --out=dist --asar --overwrite --platform=darwin
fi

npm test
