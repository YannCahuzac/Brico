'use strict';

App.controller('themeCtrl', [ '$scope', 'themesSrv', '$stateParams', 'utilSrv', '$rootScope',
		function($scope, themesSrv, $stateParams, utilSrv, $rootScope) {

			$scope.themeId = '';
			$scope.theme = null;

			// Gestion des erreurs: 
			$scope.alerts = [];
		    $scope.closeAlert = function(index) {
		        utilSrv.closeAlert($scope.alerts, index);
		    };
			
			// Recupere le theme Id de l'URL:
			if ($stateParams.themeId) {
				$scope.themeId = $stateParams.themeId;
			}
			
			// Retourne l'object theme en fonction de l'Id:
			$scope.getThemeByIdFromRoot = function() {
				$scope.theme = themesSrv.getThemeByIdFromRoot($scope.themeId);
			};
			
			$scope.getThemeByIdFromRoot();

		} ]);