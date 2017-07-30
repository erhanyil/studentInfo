angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller:'registerCtrl'
      }
    }
  })

	.state('app.login', {
      url: '/login',
      views: {
      'menuContent': {
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
    resolve:{
      "check":function($location){  
        if(sessionStorage.getItem('loggedin_id')){
          $location.path('/profile');   
        }else{
          $location.path('/login');
        }
      }
    }
  }
}
    })

  .state('app.checkout', {
      url: '/checkout',
      views: {
      'menuContent': {
      templateUrl: 'templates/checkout.html',
      controller: 'checkoutCtrl'
    }
  }
    })

  .state('app.profile', {
      url: '/profile',
      views: {
      'menuContent': {
      templateUrl: 'templates/profile.html',
      controller: 'profileCtrl'
      }
      }  
    })

  .state('app.class', {
      url: '/class',
      views: {
      'menuContent': {
      templateUrl: 'templates/class.html',
      controller: 'classCtrl'
      }
      }  
    })

  .state('app.classWindow', {
      url: '/class/:classId',
      views: {
      'menuContent': {
      templateUrl: 'templates/classWindow.html',
      controller: 'classWindowCtrl'
    }
  }
    })
  
  $urlRouterProvider.otherwise('/app/login');
});
