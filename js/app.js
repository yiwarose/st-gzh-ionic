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

  $rootScope.goBack=function(){

      $ionicHistory.goBack();

    };

})
.config(function($stateProvider, $urlRouterProvider,$locationProvider,$ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom");
  //$ionicConfigProvider.platform.android.navBar.alignTitle("center");
  //$ionicConfigProvider.platform.ios.navBar.alignTitle("center"); 

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
      controller:'HomeCtrl',
      views:{
    	  'home-tab':{
    		  templateUrl:'templates/home/home.html', 
    	  }
      }
    })
    .state('tabs.home.trade', {
      cache:false,
      url: '/trade',
      views:{
        'view':{
          templateUrl:'templates/home/home.trade.html', 
        }
      },
    })
    .state('tabs.home.timing', {
      cache:false,
      url: '/timing',
      views:{
        'view':{
          templateUrl:'templates/home/home.timing.html', 
        }
      }
    })
    .state('tabs.exchange', {
      cache:false,
      url: '/exchange',
      controller:'ExchangeCtrl',
      views:{
    	  'exchange-tab':{
    		  templateUrl:'templates/exchange/exchange.html',  
    	  }
      }
    })     
    .state('tabs.exchange.integral', {
      cache:false,
      url: '/integral',
      controller:'IntegralCtrl',
      views:{
        'exchange-view':{
          templateUrl:'templates/exchange/exchange.integral.html', 
        }
      }
    })
    .state('exchangeInfomation', {
      cache:false,
      url: '/exchangeInfomation/:id',
      controller:'ExchangeInfoCtrl',
      templateUrl:'templates/exchange/exchange.exchangeInfomation.html'
    })
    .state('tabs.exchange.declaration', {
      cache:false,
      url: '/declaration',
      controller:'DeclarationCtrl',
      views:{
        'exchange-view':{
          templateUrl:'templates/exchange/exchange.declaration.html', 
        }
      }
    })
    .state('tabs.exchange.declaration.dealing', {
      cache:false,
      url: '/dealing',
      controller:'DealingCtrl',
      views:{
        'exchange-sub-view':{
          templateUrl:'templates/exchange/exchange.declaration.dealing.html', 
        }
      }
    }) 
    .state('tabs.exchange.declaration.record', {
      cache:false,
      url: '/record',
      controller:'RecordCtrl',
      views:{
        'exchange-sub-view':{
          templateUrl:'templates/exchange/exchange.declaration.record.html', 
        }
      }
    })
    .state('declarationInfomation', {
      cache:false,
    	params:{"ifHidden":null},
      	url: '/declarationInfomation',
      	controller:'DeclarationInfoCtrl',
      	templateUrl:'templates/exchange/exchange.declarationInfomation.html'
    })
    .state('tabs.finance', {
      cache:false,
      url: '/finance',
      controller: 'FinanceCtrl',
      views:{
    	  'finance-tab':{
    		  templateUrl:'templates/finance/finance.html', 
    	  }
      }
    })    
    .state('tabs.finance.balance', {
      cache:false,
      url: '/balance',
      views:{
    	  'finance-view':{
    		  templateUrl:'templates/finance/finance.balance.html', 
    	  }
      }
    }) 
    .state('tabs.finance.detail', {
      cache:false,
      url: '/detail',
      views:{
    	  'finance-view':{
    		  templateUrl:'templates/finance/finance.detail.html', 
    	  }
      }
    }) 
    .state('tabs.finance.detail.auditing', {
      cache:false,
      url: '/auditing',
      views:{
    	  'finance-sub-view':{
    		  templateUrl:'templates/finance/finance.detail.auditing.html', 
    	  }
      }
    }) 
    .state('tabs.finance.detail.audited', {
      cache:false,
      url: '/audited',
      views:{
    	  'finance-sub-view':{
    		  templateUrl:'templates/finance/finance.detail.audited.html', 
    	  }
      }
    }) 
    .state('tabs.main', {
      cache:false,
      url: '/main',
      controller:'MainCtrl',
      views:{
    	  'main-tab':{
    		  templateUrl:'templates/main/main.html',
    	  }
      }
    }) 
    .state('dailyInfo', {
      cache:false,
      url: '/dailyInfo',
      controller:'DailyInfoCtrl',
      templateUrl:'templates/main/main.dailyInfo.html'
    }) 
    .state('accountInfo', {
      cache:false,
      url: '/accountInfo',
      controller:'AccountInfoCtrl',
      templateUrl:'templates/main/main.accountInfo.html'
    }) 
    .state('serviceRelation', {
      cache:false,
      url: '/serviceRelation',
      controller:'ServiceRelationCtrl',
      templateUrl:'templates/main/main.serviceRelation.html'
    }) 
    .state('aboutUs', {
      url: '/aboutUs',
      controller:'AboutUsCtrl',
      templateUrl:'templates/main/main.aboutUs.html'
    }) 
    .state('login', {
      cache:false,
      url : '/login',
      templateUrl : 'templates/main/main.login.html',
      controller:'LoginCtrl'
    })    
    .state('setup', {
      cache:false,
      url: '/setup',
      templateUrl: 'templates/main/main.setup.html',
      controller: 'SetupCtrl'  
    })
    .state('modify', {
      cache:false,
      url: '/modify',
      templateUrl: 'templates/main/main.setup.modify.html',
      controller: 'ModifyCtrl'  
    })
    .state('starter', {
      cache:false,
      url: '/starter',
      templateUrl: 'templates/starter.html',
      controller: 'StarterCtrl'  
    })
  $urlRouterProvider.otherwise('/tab/home/trade');
});