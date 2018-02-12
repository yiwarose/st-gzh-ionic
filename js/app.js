angular.module('GZH', ['ionic', 'GZH.controllers'])
.constant('APIURL', 'http://111.231.100.183/index.php/api/')
.run(function($ionicPlatform,$rootScope,$ionicLoading,$ionicHistory,$state,$ionicPopup,$timeout) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    if(localStorage["st.state.phone"]==undefined || localStorage["st.state.phone"]==""){

      console.log('need to login');

      $state.go("login", {}, { reload: true });

    };

  });

  $rootScope.goBack=function(){

      $ionicHistory.goBack();

    };

  $rootScope.goTo=function(url){

    $state.go(url);
  }

  $rootScope.doRefresh=function(){

    $rootScope.$broadcast('scroll.refreshComplete');

  }
    $rootScope.showLoading=function() {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

    };

    $rootScope.hideLoading= function(){

      $ionicLoading.hide();

    };

  $rootScope.showAlert = function(title,message) {
            if(title==''){title='提示';}
             var alertPopup = $ionicPopup.alert({
               title: title,
               template: '<div class="st-align-center">'+message+'</div>',
               buttons:[{
                text:'确认',
                type:'button-assertive'
               }]
             });
             alertPopup.then(function(res) {
               //console.log('Thank you for not eating my delicious ice cream cone');
             });
           };

})
.config(function($stateProvider, $urlRouterProvider,$locationProvider,$ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.views.maxCache(0);
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
    .state('tabs.exchange.batch', {
      cache:false,
      url: '/batch',
      controller:'IntegralCtrl',
      views:{
        'exchange-view':{
          templateUrl:'templates/exchange/exchange.batch.html', 
        }
      }
    })
    .state('batchInfo', {
      cache:false,
      url: '/batchInfo/:id',
      controller:'BatchInfoCtrl',
      templateUrl:'templates/exchange/exchange.batchInfo.html'
    })
    .state('tabs.exchange.query', {
      cache:false,
      url: '/query',
      controller:'DeclarationCtrl',
      views:{
        'exchange-view':{
          templateUrl:'templates/exchange/exchange.query.html', 
        }
      }
    })/*
    .state('tabs.exchange.query.undone', {
      cache:false,
      url: '/undone',
      controller:'DealingCtrl',
      views:{
        'exchange-sub-view':{
          templateUrl:'templates/exchange/exchange.undone.html', 
        }
      }
    }) 
    .state('tabs.exchange.query.history', {
      cache:false,
      url: '/record',
      controller:'RecordCtrl',
      views:{
        'exchange-sub-view':{
          templateUrl:'templates/exchange/exchange.history.html', 
        }
      }
    })*/
    .state('declarationInfo', {
      cache:false,
    	//params:{"ifHidden":null},
      	url: '/declarationInfomation/:id',
      	controller:'DeclarationInfoCtrl',
      	templateUrl:'templates/exchange/exchange.declarationInfo.html'
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
    })/*
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
    })*/
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