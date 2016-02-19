'use strict';

App.controller('newSubCtrl', [ '$scope', '$element', 'utilSrv', '$rootScope',
		function($scope, $element, utilSrv, $rootScope) {
			
			$scope.alerts = [];
			$scope.closeAlert = function(index) {
				utilSrv.closeAlert($scope.alerts, index);
			};

			$scope.closeAlert();
			
			if($rootScope.user){
				$scope.postDao = {
					idUserCreation : $rootScope.user.idUser,
					pseudoUserCreation : $rootScope.user.pseudo,
					idPostRef : '',
					themeId : null,
					title : '',
					post : ''
				};
			}else{
				$scope.alerts = utilSrv.alertIt('danger', 'Vous devez \u00eatre connect\u00e9 pour publier un nouveau post.');
			}
						
			$scope.submitNewSub = function(){
				if($scope.postDao.post === '' || $scope.postDao.themeId === null || $scope.postDao.themeId === '' || $scope.postDao.themeId === undefined || $scope.postDao.title === ''){
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez s\u00e9lectionner un th\u00e8me, renseigner un titre et d\u00e9crire votre requ\u00eate pour valider le formulaire.');
				}else{
					// TODO Enregistrement Server
					$scope.alerts = utilSrv.alertIt('success', 'Votre requ\u00eate a bien \u00e9t\u00e9 prise en compte et sera accessible dans le th\u00e8me choisi.');
				}
			}
} ]);