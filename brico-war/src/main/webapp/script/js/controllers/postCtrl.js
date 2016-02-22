'use strict';

// Ce controller est utilisé pour 2 states définis dans app.js: postById et postByIdUser.

App.controller('postCtrl', [ '$scope', '$stateParams', 'utilSrv', '$rootScope', 'postSrv', '$timeout', '$state',
		function($scope, $stateParams, utilSrv, $rootScope, postSrv, $timeout, $state) {

			$scope.maxRate = 10;
			// Tous les posts (y compris le parent) liés au postId (dans le cas du state postById):
			// Dans le cas du state postByIdUser, ça correspond à tous les post de l'user:
			$scope.posts = [];
			
			// Variable utilisée juste dans le cas du state postByIdUser (on les met là pour pas faire planter angular avec un null pointer): 
			$scope.postsFiltered = [];
			
			// Gestion des erreurs: 
			$scope.alerts = [];
			$scope.closeAlert = function(index) {
				utilSrv.closeAlert($scope.alerts, index);
			};

			if($state.current.name === 'postById'){

				// Bouton Contribution:
				$scope.isCollapsedContribBtn = true;

				$scope.postChild = null;
				
				// Auto injecté dans l'URL:
				// Dans le cas de la recherche par postId:
				$scope.postId = '';
				// Le post correspondant à notre Id:
				$scope.postParent = null;
					
				// Recupere le theme Id de l'URL:
				if ($stateParams.postId) {
					$scope.postId = $stateParams.postId;
				}

				// Compare le $scope.postId avec l'elt du tableau (juste pour le state postById, mais on le met là car sinon erreur [IE Fonction Imbriquée]):
				var BreakException= {};
		    	var getIt = function (element, index, array) {
		    	    if(element.idPost == $scope.postId){
		    	    	// Affectation du post Parent (en principe c'est le premier de la liste car ORDER BY dateCreation)
		    	    	$scope.postParent = $scope.posts[index];
		    	    	// Permet de quitter le foreach:
		    	    	throw BreakException;
		    	    }
		    	}
				
		    	// Création d'un post Child - réponse
				var initPostChild = function(){
					if($rootScope.user != null && $scope.postParent != null && $scope.postParent.idPost != null && $scope.postParent.idPost != ''){
						console.log("Création Post Enfant.");
						return {
							idUserCreation : $rootScope.user.idUser,
							pseudoUserCreation : $rootScope.user.pseudo,
							idPostRef : $scope.postParent.idPost,
							themeId : null,
							title : '',
							post : '',
							idPost : null,
							dateCreation : null,
							nbVotes : 0,
							note : 0,
							postValidate : 0,
							noteUser : 0,
							overStar : false,
							noteUserOver : 0,
							dateCreaS : '',
							libcss1 : ''
						};
					}else{
						return [];
					}
				}
		    	
		    	// Iteration sur chaque post pour retrouver le post parent:
				$scope.getParentFromAllPosts = function(){
					if($scope.postId != null && $scope.postId != '' && $scope.posts != null && $scope.posts.length > 0){
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
				
				// TODO
				$scope.postChild = initPostChild();
				
			} else if($state.current.name === 'postByIdUser' && $rootScope.user){
				
				$scope.filter = '';

				// Auto injecté dans l'URL:
				// Dans le cas de la recherche par userId:
				$scope.idUser = '';
								
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
				
				// Recupere le theme Id de l'URL:
				if ($stateParams.idUser) {
					$scope.idUser = $stateParams.idUser;
				}
				
				// Recupere les posts cote serveur en fonction de l'user Id:
				$scope.getPostsByUserId = function() {
					if($scope.idUser != null && $scope.idUser != ''){
						postSrv.getPostsByUserId($scope.idUser).then(function(d) {
							$scope.posts = d;
							$scope.postsFiltered = d;
						}, function(errResponse) {
							$scope.alerts = utilSrv.alertIt('danger', 'Vous n\'avez publi\u00e9 aucun post pour le moment.');
						});
					} else{
						$scope.alerts = utilSrv.alertIt('danger', 'Aucun utilisateur Id n\' est renseign\u00e9.');
					}
				};
				
				// Init:
				$scope.getPostsByUserId();
				
				$scope.findStringInPosts = function(){
					 $scope.postsFiltered = postSrv.findStringInPosts($scope.filter, $scope.posts);
				}
				
			} else if($state.current.name === 'postByIdUser' && !$rootScope.user){
				$scope.alerts = utilSrv.alertIt('danger', 'Vous devez \u00eatre connect\u00e9 pour acc\u00e9der \u00e0 cette page.');
			}
			
		} ]);