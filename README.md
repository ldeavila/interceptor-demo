# interceptor-demo
Demos how the use of an interceptor can help with:

  * User feedback
  * Common Error Handling
  * Commin Logging

## Installation

It's assumed ionic and cordova are already installed globally. Otherwise see the ionic documentation on getting started.

`npm install`

`bower install`

`cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git`

`ionic platform add ios` or `ionic platform add android` (requires the Android SDK to be installed)

## Starting API Server
`PORT=80 npm start` (You'll likely need sudo access if you're an a unix-based machine)


## Sample Interceptor
You can find the interceptor here `www/js/my-interceptor-module.js`
