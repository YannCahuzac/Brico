'use strict';

App.controller('homeCtrl', [ '$scope', 'themesSrv', function($scope, themesSrv) {

	$scope.themes = [];

	$scope.getThemes = function() {
		themesSrv.getThemes().then(function(d) {
			$scope.themes = d;
		}, function(errResponse) {
			$scope.error = errResponse.statusText;
		});
	};

	$scope.getThemes();

} ]);