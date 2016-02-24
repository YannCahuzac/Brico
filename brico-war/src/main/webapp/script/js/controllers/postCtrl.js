'use strict';

// Ce controller est utilisé pour 2 states définis dans app.js: postById et postByIdUser.

App.controller('postCtrl', [ '$scope', '$stateParams', 'utilSrv', '$rootScope', 'postSrv', '$timeout', '$state',
		function($scope, $stateParams, utilSrv, $rootScope, postSrv, $timeout, $state) {

			// Note max d'un post:
			$scope.maxRate = 10;
			
			// Etat du spinner lors d'une validation de formulaire:
			$scope.showSpinner = false;
			
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

				// Post enfant - réponse
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

				// Compare le $scope.postId avec l'elt du tableau:
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
						return {
							idUserCreation : $rootScope.user.idUser,
							pseudoUserCreation : $rootScope.user.pseudo,
							idPostRef : $scope.postParent.idPost,
							themeId : $scope.postParent.themeId,
							title : $scope.postParent.title,
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
						return null;
					}
				}
		    		
				// Enregistrement du post child:
				$scope.createPostChild = function(){
					if($scope.postChild == null || ($scope.postChild != null && $scope.postChild.post != null && $scope.postChild.post === '')){
						$scope.alerts = utilSrv.alertIt('danger', 'Enregistrement impossible. V\u00e9rifiez que vous avez bien renseign\u00e9 votre r\u00e9ponse.');
					}else if($scope.postChild != null && $scope.postChild.post != null && $scope.postChild.post.length > 500){
						$scope.alerts = utilSrv.alertIt('danger', 'La taille maximum de votre r\u00e9ponse est de 500 caract\u00e8res.');
					}else{
						$timeout(function() {
							$scope.$apply(function () {
								$scope.showSpinner = true;
							});
							postSrv.createPost($scope.postChild).then(function(d) {
								if(d){
									if(d.create){
										$scope.showSpinner = false;
										$scope.getPostsByPostId();
										$scope.alerts = utilSrv.alertIt('success', 'Votre r\u00e9ponse a bien \u00e9t\u00e9 cr\u00e9\u00e9e.');
									}else{
										$scope.alerts = utilSrv.alertIt('danger', d.lib1);
									}
								}else{
									$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre post.');
								}
							}, function(errResponse) {
								$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de l\'enregistrement de votre r\u00e9ponse.');
							});
						}, 0);
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
							// On init le post child ICI car ce post child a besoin des attributs du post parent.
							// A cause des pbs asynchrones serveur, si on met ça en dehors de cette méthode: le post parent sera tjr null quand on init le child.
							$scope.postChild = initPostChild();
						}, function(errResponse) {
							$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9.');
						});
					} else{
						$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' est renseign\u00e9.');
					}
				};
				
				// Init:
				$scope.getPostsByPostId();
				
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
				
				// Filtre:
				$scope.findStringInPosts = function(){
					 $scope.postsFiltered = postSrv.findStringInPosts($scope.filter, $scope.posts);
				}
				
			} else if($state.current.name === 'postByIdUser' && !$rootScope.user){
				$scope.alerts = utilSrv.alertIt('danger', 'Vous devez \u00eatre connect\u00e9 pour acc\u00e9der \u00e0 cette page.');
			}
			
		} ]);