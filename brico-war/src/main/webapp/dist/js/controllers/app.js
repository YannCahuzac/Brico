'use strict';

var App = angular.module('bricoAngular', [ 'ui.router', 'ui.bootstrap',
		'ngCookies' ]);

App.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/',
		templateUrl : '../templates/home.html',
		controller : 'homeCtrl'
	});

	$urlRouterProvider.otherwise('/');

	// Application routes
	// $stateProvider
	// .state('index', {
	// url: '/',
	// templateUrl: 'templates/dashboard.html'
	// })
	// .state('tables', {
	// url: '/tables',
	// templateUrl: 'templates/tables.html'
	// });
	// }

});