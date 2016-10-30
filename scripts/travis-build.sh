#!/usr/bin/env bash

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
  export DISPLAY=:99.0
  sh -e /etc/init.d/xvfb start
  sleep 3
fi

node --version
npm --version

npm install -g mocha
npm install
if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
	electron-packager . --out=dist --asar --overwrite --platform=linux
else
	electron-packager . --out=dist --asar --overwrite --platform=darwin
fi
npm test
