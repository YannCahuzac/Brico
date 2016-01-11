'use strict';

var App = angular.module('bricoAngular', [ 'ui.router' ]);

App.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/',
		templateUrl : 'Home/home.html',
		controller : 'homeCtrl'
	});

	$urlRouterProvider.otherwise('/');

});