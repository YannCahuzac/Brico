// Ce controller est utilisé pour 2 states définis dans app.js: postById et postByIdUser.
App.controller('postCtrl', [ '$scope', '$stateParams', 'utilSrv', '$rootScope', 'postSrv', '$timeout', '$state', '$cookieStore',
		function($scope, $stateParams, utilSrv, $rootScope, postSrv, $timeout, $state, $cookieStore) {

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
			
			$scope.closePostAlert = function(post, index) {
				utilSrv.closeAlert(post.alerts, index);
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
							idPostRef : $scope.postParent.idPost,
							themeId : $scope.postParent.themeId,
							title : $scope.postParent.title,
							post : '',
							typePost : $scope.postParent.typePost,
							tokenUser: $rootScope.user.token,
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
								$scope.showSpinner = false;
								if(d){
									if(d.create){
										$scope.getPostsByPostId();
										$scope.alerts = utilSrv.alertIt('success', 'Votre r\u00e9ponse a bien \u00e9t\u00e9 cr\u00e9\u00e9e.');
									}else{
										$scope.alerts = utilSrv.alertIt('danger', d.lib1);
									}
								}else{
									$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre post.');
								}
							}, function(errResponse) {
								$scope.showSpinner = false;
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
							if(d != null && d.length > 0){
								$scope.posts = d;
								$scope.getParentFromAllPosts();
								// On init le post child ICI car ce post child a besoin des attributs du post parent.
								// A cause des pbs asynchrones serveur, si on met ça en dehors de cette méthode: le post parent sera tjr null quand on init le child.
								$scope.postChild = initPostChild();
							}else{
								$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9.');
							}
						}, function(errResponse) {
							$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9.');
						});
					} else{
						$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' est renseign\u00e9.');
					}
				};
				
				// Méthode qui permet de valider un post (parent) quand c'est l'user (connecté) du post qui en fait la demande:
				$scope.validatePost = function(){
					if($rootScope.user && $scope.postParent){
						$scope.postParent.tokenUser = $rootScope.user.token;
						$timeout(function() {
							$scope.$apply(function () {
								$scope.showSpinner = true;
							});
							postSrv.validatePost($scope.postParent).then(function(d) {
								$scope.showSpinner = false;
								if(d){
									if(d.create){
										$scope.getPostsByPostId();
										$scope.alerts = utilSrv.alertIt('success', 'Votre post a bien \u00e9t\u00e9 valid\u00e9e.');
									}else{
										$scope.alerts = utilSrv.alertIt('danger', d.lib1);
									}
								}else{
									$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la validation de votre post.');
								}
							}, function(errResponse) {
								$scope.showSpinner = false;
								$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la validation de votre post.');
							});
						}, 0);
					}
				}
				
				// Recherche dans un tab à plusieurs dimensions:
				$scope.findInMultipleDim = function(tab, value){
					var result = null;
					for( var i = 0, len = tab.length; i < len; i++ ) {
					    if( tab[i][0] === value ) {
					        result = tab[i];
					        break;
					    }
					}
					return result;
				}
				
				// Méthode qui permet de voter pour un post (user connecté ou non):
				$scope.voteThisPost = function(post, note){
					console.log('-------------------');
					// On genere le cookie au cas où il n'existerait pas:
					if (!angular.isDefined($cookieStore.get('voteCookie'))) {
						$cookieStore.put('voteCookie', []);
					}
					// On stocke la valeur du cookie dans un array:
					var tabPostsIds = $cookieStore.get('voteCookie');
					// On check si cet array contient déjà le postId:
					var result = $scope.findInMultipleDim(tabPostsIds, post.idPost); 
					if(result !== null){
						post.alerts = utilSrv.alertIt('warning', 'Vous aviez d\u00e9j\u00e0 attribu\u00e9 ' + result[1] + '/10 \u00e0 ce post !');
						// On remet la note qu'avait déjà mis l'utilisateur:
						post.noteUser = result[1];
					}else{
						$scope.showSpinner = true;
						var data = postSrv.voteThisPost(post); 

						data.then(function(d) {
							console.log('DEBUT THEN');
							if(d){
								post = d;
								post.alreadyVoted = true;
								post.alerts = utilSrv.alertIt('success', 'Votre vote a bien \u00e9t\u00e9 pris en compte pour ce post !');
								
								tabPostsIds.push([post.idPost, post.noteUser]);
								$cookieStore.put('voteCookie', tabPostsIds);
							}else{
								$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors du vote du post.');
							}
						});
						$scope.showSpinner = false;

					}
					console.log('FIN');
				}
								
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
							if(d != null && d.length > 0){
								$scope.posts = d;
								$scope.postsFiltered = d;
							}else{
								$scope.alerts = utilSrv.alertIt('danger', 'Vous n\'avez publi\u00e9 aucun post pour le moment.');
							}
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