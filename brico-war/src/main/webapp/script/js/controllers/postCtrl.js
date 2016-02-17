'use strict';

App.controller('postCtrl', [ '$scope', '$stateParams', 'utilSrv', '$rootScope', 'postSrv', '$timeout',
		function($scope, $stateParams, utilSrv, $rootScope, postSrv, $timeout) {

			$scope.posts = [];
			// Auto injecté dans l'URL:
			$scope.postId = '';
			
			// Gestion des erreurs: 
			$scope.alerts = [];
		    $scope.closeAlert = function(index) {
		        utilSrv.closeAlert($scope.alerts, index);
		    };
				
			// Recupere le theme Id de l'URL:
			if ($stateParams.postId) {
				$scope.postId = $stateParams.postId;
			}
		    
			// Recupere les posts cote serveur en fonction du post Id:
			$scope.getPostsByPostId = function() {
				if($scope.postId != null && $scope.postId != ''){
					postSrv.getPostsByPostId($scope.postId).then(function(d) {
						$scope.posts = d;
					}, function(errResponse) {
						$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9.');
					});
				} else{
					$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' est renseign\u00e9.');
				}
			};
			
			// Init:
			$scope.getPostsByPostId();

		} ]);