'use strict';

App.controller('themeCtrl', [ '$scope', 'themesSrv', '$stateParams', 'utilSrv', '$rootScope', 'postSrv', '$timeout',
		function($scope, themesSrv, $stateParams, utilSrv, $rootScope, postSrv, $timeout) {

			$scope.themeId = '';
			$scope.theme = null;
			$scope.posts = [];

			// Gestion des erreurs: 
			$scope.alerts = [];
		    $scope.closeAlert = function(index) {
		        utilSrv.closeAlert($scope.alerts, index);
		    };
			
			// Recupere le theme Id de l'URL:
			if ($stateParams.themeId) {
				$scope.themeId = $stateParams.themeId;
			}

			$scope.config = {
				    itemsPerPage: 10,
				    fillLastPage: true,
				    paginatorLabels: {
				        stepBack: '‹',
				        stepAhead: '›',
				        jumpBack: '«',
				        jumpAhead: '»',
				        first: 'D\u00e9but',
				        last: 'Fin'
				    }
			}
			
			// Retourne l'object theme en fonction de l'Id et recupere les posts cote serveur en fonction du theme Id:
			$scope.getPostsByThemeId = function() {
				$scope.theme = themesSrv.getThemeByIdFromRoot($scope.themeId);
				
				postSrv.getPostsByThemeId($scope.themeId).then(function(d) {
					$scope.posts = d;
				}, function(errResponse) {
					$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9 pour le th\u00e8me ' + $scope.theme.lib1 + '.');
				});
			};
			
			// Init:
			$scope.getPostsByThemeId();

		} ]);