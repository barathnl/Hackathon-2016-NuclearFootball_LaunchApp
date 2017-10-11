angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.launchKeyGenerator', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/launchKeyGenerator.html',
        controller: 'launchKeyGeneratorCtrl'
      }
    }
  })

  .state('menu.launch', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/launch.html',
        controller: 'launchCtrl'
      }
    }
  })

  .state('login', {
    url: '/page3',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

$urlRouterProvider.otherwise('/page3')

  

});