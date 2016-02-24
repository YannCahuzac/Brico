'use strict';

var App = angular.module('bricoAngular', [ 'ui.router', 'ngAnimate', 'ui.bootstrap',
		'ngCookies', 'ui.select2', 'angular-table' ]);

App.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/',
		templateUrl : '../templates/home.html',
		controller : 'homeCtrl'
	}).state('newPost', {
		url : '/newPost',
		templateUrl : '../templates/newPost.html',
		controller : 'newPostCtrl'
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
	}).state('newAccount', {
		url : '/newAccount',
		templateUrl : '../templates/newAccount.html',
		controller : 'newAccountCtrl'
	});

	$urlRouterProvider.otherwise('/');

});