'use strict';

var App = angular.module('bricoAngular', [ 'ui.router', 'ngAnimate', 'ui.bootstrap',
		'ngCookies', 'ui.select2', 'angular-table' ]);

App.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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
		templateUrl : '../templates/mergeAccount.html',
		controller : 'mergeAccountCtrl'
	}).state('updateAccount', {
		url : '/updateAccount',
		templateUrl : '../templates/mergeAccount.html',
		controller : 'mergeAccountCtrl'
	}).state('license', {
		url : '/license',
		templateUrl : '../templates/info.html',
		controller : 'infoCtrl'
	}).state('aide', {
		url : '/aide',
		templateUrl : '../templates/info.html',
		controller : 'infoCtrl'
	});

	$urlRouterProvider.otherwise('/');

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
	
});