angular.module('GZH', ['ionic', 'GZH.controllers'])
.constant('APIURL', 'http://www.st-it.cn/index.php/api/')
.run(function($ionicPlatform,$rootScope,$ionicLoading,$ionicHistory) {
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
.config(function($stateProvider, $urlRouterProvider,$locationProvider,$ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom");

  $stateProvider
  .state('tabs', {
        url : '/tab',
        abstract : true,
        cache:false,
        templateUrl : 'templates/tabs.html',
        controller:'TabCtrl'
      })
    .state('tabs.home', {
      cache:false,
      url: '/home',
      views:{
    	  'home-tab':{
    		  templateUrl:'templates/home.html', 
    	  }
      }
    })
    .state('tabs.home.trade', {
      cache:false,
      url: '/trade',
      views:{
        'view':{
          templateUrl:'templates/home.trade.html', 
        }
      },
    })
    .state('tabs.home.timing', {
      cache:false,
      url: '/timing',
      views:{
        'view':{
          templateUrl:'templates/home.timing.html', 
        }
      }
    })
    .state('tabs.exchange', {
      cache:false,
      url: '/exchange',
      views:{
    	  'exchange-tab':{
    		  templateUrl:'templates/exchange.html',  
    	  }
      }
    })       
    .state('tabs.finance', {
      cache:false,
      url: '/finance',
      views:{
    	  'finance-tab':{
    		  templateUrl:'templates/finance.html', 
    	  }
      }
    })       
    .state('tabs.main', {
      cache:false,
      url: '/main',
      views:{
    	  'main-tab':{
    		  templateUrl:'templates/main.html',
    	  }
      }
    }) 
    .state('login', {
      url : '/login',
      templateUrl : 'templates/login.html',
      controller:'LoginCtrl'
      })    
    .state('starter', {
      url: '/starter',
      templateUrl: 'templates/starter.html',
      controller: 'StarterCtrl'  
  })
  $urlRouterProvider.otherwise('/tab/home/trade');
});