'use strict';

App.controller('themeCtrl', [ '$scope', 'themesSrv', '$stateParams', 'utilSrv', '$rootScope', 'commSrv', '$timeout',
		function($scope, themesSrv, $stateParams, utilSrv, $rootScope, commSrv, $timeout) {

			$scope.themeId = '';
			$scope.theme = null;
			$scope.comms = [];

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
			
			// Retourne l'object theme en fonction de l'Id et recupere les commentaires cote serveur en fonction du theme Id:
			$scope.getCommByThemeId = function() {
				$scope.theme = themesSrv.getThemeByIdFromRoot($scope.themeId);
				
				commSrv.getCommByThemeId($scope.themeId).then(function(d) {
					$scope.comms = d;
					console.log($scope.comms);				
				}, function(errResponse) {
					$scope.alerts = utilSrv.alertIt('danger', 'Aucun commentaire n\' a \u00e9t\u00e9 recup\u00e9r\u00e9 pour le th\u00e8me ' + $scope.theme.lib1 + '.');
				});
			};
			
			// Init:
			$scope.getCommByThemeId();

		} ]);