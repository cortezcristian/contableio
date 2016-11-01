#!/usr/bin/env bash

if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
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
