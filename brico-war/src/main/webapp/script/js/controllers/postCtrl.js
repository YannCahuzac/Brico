'use strict';

App.controller('postCtrl', [ '$scope', '$stateParams', 'utilSrv', '$rootScope', 'postSrv', '$timeout',
		function($scope, $stateParams, utilSrv, $rootScope, postSrv, $timeout) {

			// Auto injecté dans l'URL:
			$scope.postId = '';
			// Le post correspondant à notre Id:
			$scope.postParent = null;
			// Tous les posts (y compris le parent) liés au postId:
			$scope.posts = [];
			
			// Gestion des erreurs: 
			$scope.alerts = [];
		    $scope.closeAlert = function(index) {
		        utilSrv.closeAlert($scope.alerts, index);
		    };
				
			// Recupere le theme Id de l'URL:
			if ($stateParams.postId) {
				$scope.postId = $stateParams.postId;
			}
		    
	    	// Iteration sur chaque post pour retrouver le post parent:
			$scope.getParentFromAllPosts = function(){
				if($scope.postId != null && $scope.postId != '' && $scope.posts != null && $scope.posts.length > 0){
					
					var BreakException= {};
					
					// Compare le $scope.postId avec l'elt du tableau:
			    	function getIt(element, index, array) {
			    	    if(element.idPost == $scope.postId){
			    	    	// Affectation du post Parent (en principe c'est le premier de la liste car ORDER BY dateCreation)
			    	    	$scope.postParent = $scope.posts[index];
			    	    	// Permet de quitter le foreach:
			    	    	throw BreakException;
			    	    }
			    	}

		    		try{
		    			$scope.posts.forEach(getIt);
		    		} catch(e) {
		    		    if (e === BreakException){}
		    		}
				}
			}
			
			// Recupere les posts cote serveur en fonction du post Id:
			$scope.getPostsByPostId = function() {
				if($scope.postId != null && $scope.postId != ''){
					postSrv.getPostsByPostId($scope.postId).then(function(d) {
						$scope.posts = d;
						$scope.getParentFromAllPosts();
					}, function(errResponse) {
						$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9.');
					});
				} else{
					$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' est renseign\u00e9.');
				}
			};
			
			// Init:
			$scope.getPostsByPostId();

			// ######################### Staring #########################
			$scope.rate = 7;
			$scope.max = 10;
			$scope.isReadonly = false;
			
			$scope.hoveringOver = function(value) {
				$scope.overStar = value;
				$scope.percent = 100 * (value / $scope.max);
			};
			
			$scope.ratingStates = [
	           {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
	           {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
	           {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
	           {stateOn: 'glyphicon-heart'},
	           {stateOff: 'glyphicon-off'}
			];
			// ######################### Staring #########################
			
		} ]);