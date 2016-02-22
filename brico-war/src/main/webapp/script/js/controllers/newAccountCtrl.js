'use strict';

App.controller('newAccountCtrl', [ '$scope', '$element','$rootScope', 'newAccountSrv', 'utilSrv',
		function($scope, $element, $rootScope, newAccountSrv, utilSrv) {
			
			$scope.alerts = [];
			$scope.closeAlert = function(index) {
				utilSrv.closeAlert($scope.alerts, index);
			};

			$scope.newUser = null;
			
			var initUser = function(){
				return {
					idUser : null,
					dateCreation : null,
					pseudo : '',
					password : '',
					password2 : '',
					tel : '',
					mail : '',
					ville : '',
					cp : '',
					rue : '',
					nbVotes : 0,
					note : 0,
					role : ''
				};
			}
			
			$scope.init = function(){
				$scope.newUser = initUser();
			}
			
			$scope.createNewAccount = function(){
				console.log($scope.user);
				if(
					$scope.newUser != null 
					&& $scope.newUser.pseudo != null && $scope.newUser.pseudo !== ''
					&& $scope.newUser.password != null && $scope.newUser.password !== '' 
					&& $scope.newUser.password2 != null && $scope.newUser.password2 !== '' 
					&& $scope.newUser.password === $scope.newUser.password2
					&& $scope.newUser.mail != null && $scope.newUser.mail !== ''
					&& $scope.newUser.ville != null && $scope.newUser.ville !== ''
					&& $scope.newUser.cp != null && $scope.newUser.cp !== ''
					&& $scope.newUser.rue != null && $scope.newUser.rue !== ''
				){
					console.log($scope.newUser);
					newAccountSrv.createNewAccount($scope.newUser).then(function(d) {
						// TODO Voir redirection??
						$scope.alerts = utilSrv.alertIt('success', 'Votre compte a bien \u00e9t\u00e9 cr\u00e9\u00e9.');
					}, function(errResponse) {
						$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre compte.');
					});
				}
				else if(
					$scope.newUser.password != null && $scope.newUser.password !== '' 
					&& $scope.newUser.password2 != null && $scope.newUser.password2 !== '' 
					&& $scope.newUser.password !== $scope.newUser.password2
					)
				{
					$scope.alerts = utilSrv.alertIt('danger', 'Les mots de passe saisis ne sont pas identiques.');
				}else{
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez renseigner tous les champs obligatoires.');
				}
			}
			
			// Init:
			$scope.init();
} ]);