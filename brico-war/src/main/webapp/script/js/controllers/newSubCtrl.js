'use strict';

App.controller('newSubCtrl', [ '$scope', '$element', 'utilSrv', '$rootScope', 'postSrv',
		function($scope, $element, utilSrv, $rootScope, postSrv) {
			
			$scope.alerts = [];
			$scope.closeAlert = function(index) {
				utilSrv.closeAlert($scope.alerts, index);
			};

			$scope.closeAlert();
			
			var initPost = function(){
				return {
					idUserCreation : $rootScope.user.idUser,
					pseudoUserCreation : $rootScope.user.pseudo,
					idPostRef : 0,
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
			}
			
			if($rootScope.user){
				$scope.postDao = initPost();
			}else{
				$scope.alerts = utilSrv.alertIt('danger', 'Vous devez \u00eatre connect\u00e9 pour publier un nouveau post.');
			}
						
			$scope.submitNewSub = function(){
				if($scope.postDao.post === '' || $scope.postDao.themeId === null || $scope.postDao.themeId === '' || $scope.postDao.themeId === undefined || $scope.postDao.title === ''){
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez s\u00e9lectionner un th\u00e8me, renseigner un titre et d\u00e9crire votre requ\u00eate pour valider le formulaire.');
				}else{
					console.log($scope.postDao);
					postSrv.createPost($scope.postDao).then(function(d) {
						$scope.postDao = initPost();
						$scope.alerts = utilSrv.alertIt('success', 'Votre post a bien \u00e9t\u00e9 cr\u00e9\u00e9 et est accessible dans le th\u00e8me choisi.');
					}, function(errResponse) {
						$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre post.');
					});
				}
			}
} ]);