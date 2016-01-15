'use strict';

var App = angular.module('bricoAngular', [ 'ui.router', 'ui.bootstrap',
		'ngCookies', 'ui.select2' ]);

App.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/',
		templateUrl : '../templates/home.html',
		controller : 'homeCtrl'
	}).state('newSub', {
		url : '/newSub',
		templateUrl : '../templates/newSub.html',
		controller : 'newSubCtrl'
	});

	$urlRouterProvider.otherwise('/');

});