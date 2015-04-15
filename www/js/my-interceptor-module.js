(function () {
  'use strict';
  angular
    .module('myInterceptorModule', [])

    .constant('myConfig', {
      toast: {
        error: {
          message: 'An Error Occurred',
          duration: 'short',
          location: 'bottom'
        }

      },
      loading: {
        message: 'Working...',
        duration: 300
      },
      enableDebugging: true
    })

    .factory('myCordovaToastService', function ($injector, $cordovaToast, myConfig) {
      return {
        show: show,
        hide: hide,
        toast: toast
      };

      // functions
      function show() {
        $injector.get("$ionicLoading").show({
          template: myConfig.loading.message,
          showDelay: myConfig.loading.duration
        });
      }

      function hide() {
        $injector.get("$ionicLoading").hide()
      }

      function toast(response) {
        if (containsHttp(response.config.url)) {
          if (window.plugins === undefined) {
            console.log('MOCK TOAST: ', myConfig.toast.error.message)
          } else {
            $cordovaToast.show(
              myConfig.toast.error.message,
              myConfig.toast.error.duration,
              myConfig.toast.error.location);
          }
        }
      }

      function containsHttp(url) {
        return url.indexOf('http') !== -1
      }

    })

    .factory('myInterceptor', myInterceptor)

    .factory('myHttpLogger', myHttpLogger)

    .factory('dionSanders', dionSanders)

    .config(function ($httpProvider, $logProvider, myConfig) {

      $logProvider.debugEnabled(myConfig.enableDebugging);

      $httpProvider.interceptors.push('myInterceptor', 'myHttpLogger', 'dionSanders');

    });

  ////
  function dionSanders($q) {
    return {
      request: request
    };
    ////

    function request(config) {
      //console.log(config);
      return config;
    }

  }

  function myInterceptor($q, myCordovaToastService) {

    return {
      request: request,
      requestError: requestError,
      response: response,
      responseError: responseError
    };

    ////

    function request(config) {
      myCordovaToastService.show();

      return config;
    }

    function requestError(rejection) {
      myCordovaToastService.hide();

      return $q.reject(rejection);
    }

    function response(response) {
      myCordovaToastService.hide();

      return response;
    }

    function responseError(rejection) {
      myCordovaToastService.hide();
      myCordovaToastService.toast(rejection);

      return $q.reject(rejection);
    }

  }

  function myHttpLogger($q, $log) {

    return {
      request: request,
      response: response,
      responseError: responseError
    };

    ////
    function containsHttp(url) {

      return url.indexOf('http') !== -1;
    }

    function getTimeStamp() {
      return new Date().getTime();
    }

    function calculateTime(requestTimestamp, responseTimestamp) {
      return (responseTimestamp - requestTimestamp) / 1000;
    }

    function request(config) {

      if (containsHttp(config.url)) {
        config.requestTimestamp = getTimeStamp();
      }

      return config;
    }

    function response(response) {

      if (containsHttp(response.config.url)) {
        $log.debug('DEBUG | ' + response.status + ' ' + response.config.url + ' | ' + calculateTime(response.config.requestTimestamp, getTimeStamp()));
      }

      return response;
    }

    function responseError(rejection) {
      if (containsHttp(rejection.config.url)) {
        $log.debug('DEBUG | ' + rejection.status + ' ' + rejection.config.url + ' | ' + calculateTime(rejection.config.requestTimestamp, getTimeStamp()));

      }

      return $q.reject(rejection);
    }
  }

})();
