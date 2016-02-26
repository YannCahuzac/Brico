App.controller('themeCtrl', [ '$scope', 'themesSrv', '$stateParams', 'utilSrv', '$rootScope', 'postSrv', '$timeout',
		function($scope, themesSrv, $stateParams, utilSrv, $rootScope, postSrv, $timeout) {

			// Auto injecté dans l'URL:
			$scope.themeId = '';
			$scope.theme = null;
			$scope.posts = [];
			$scope.postsFiltered = [];

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
				        stepBack: '\u003c',
				        stepAhead: '\u003e',
				        jumpBack: '\u00ab',
				        jumpAhead: '\u00bb',
				        first: 'D\u00e9but',
				        last: 'Fin'
				    }
			}
			
			// Retourne l'object theme en fonction de l'Id et recupere les posts cote serveur en fonction du theme Id:
			$scope.getPostsByThemeId = function() {
				if($scope.themeId != null && $scope.themeId != ''){
					$scope.theme = themesSrv.getThemeByIdFromRoot($scope.themeId);
					postSrv.getPostsByThemeId($scope.themeId).then(function(d) {
						if(d != null && d.length > 0){
							$scope.posts = d;
							$scope.postsFiltered = d;
						}else{
							$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9' + ( $scope.theme ? ' pour le th\u00e8me ' + $scope.theme.lib1 + '.' : '.'));
						}
					}, function(errResponse) {
						$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9' + ( $scope.theme ? ' pour le th\u00e8me ' + $scope.theme.lib1 + '.' : '.'));
					});
				} else{
					$scope.alerts = utilSrv.alertIt('danger', 'Aucun th\u00e8me n\' est renseign\u00e9.');
				}
			};
			
			// Init:
			$scope.getPostsByThemeId();

			$scope.findStringInPosts = function(){
				 $scope.postsFiltered = postSrv.findStringInPosts($scope.filter, $scope.posts);
			}
			
		} ]);