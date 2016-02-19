'use strict';

var App = angular.module('bricoAngular', [ 'ui.router', 'ngAnimate', 'ui.bootstrap',
		'ngCookies', 'ui.select2', 'angular-table' ]);

App.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/',
		templateUrl : '../templates/home.html',
		controller : 'homeCtrl'
	}).state('newSub', {
		url : '/newSub',
		templateUrl : '../templates/newSub.html',
		controller : 'newSubCtrl'
	}).state('auth', {
		url : '/auth',
		templateUrl : '../templates/login.html'
	}).state('theme', {
		url : '/theme/:themeId',
		templateUrl : '../templates/theme.html',
		controller : 'themeCtrl'
	}).state('postById', {
		url : '/post/:postId',
		templateUrl : '../templates/post.html',
		controller : 'postCtrl'
	}).state('postByIdUser', {
		url : '/postUser/:idUser',
		templateUrl : '../templates/postUser.html',
		controller : 'postCtrl'
	});

	$urlRouterProvider.otherwise('/');

});