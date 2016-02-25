App.controller('newAccountCtrl', [ '$scope', '$element','$rootScope', 'newAccountSrv', 'utilSrv', 'authSrv', '$timeout',
		function($scope, $element, $rootScope, newAccountSrv, utilSrv, authSrv, $timeout) {
			
			// Etat du spinner lors d'une validation de formulaire:
			$scope.showSpinner = false;	
	
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
					role : 0
				};
			}
			
			$scope.init = function(){
				$scope.newUser = initUser();
			}
			
			$scope.createNewAccount = function(){
				if(
					!($scope.newUser != null 
					&& $scope.newUser.pseudo != null && $scope.newUser.pseudo !== ''
					&& $scope.newUser.password != null && $scope.newUser.password !== '' 
					&& $scope.newUser.password2 != null && $scope.newUser.password2 !== ''
					&& $scope.newUser.mail != null && $scope.newUser.mail !== ''
					&& $scope.newUser.ville != null && $scope.newUser.ville !== ''
					&& $scope.newUser.cp != null && $scope.newUser.cp !== ''
					&& $scope.newUser.rue != null && $scope.newUser.rue !== '')
				){
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez renseigner tous les champs obligatoires.');
				} else if(
					$scope.newUser.password != null && $scope.newUser.password !== '' 
					&& $scope.newUser.password2 != null && $scope.newUser.password2 !== '' 
					&& $scope.newUser.password !== $scope.newUser.password2
					)
				{
					$scope.alerts = utilSrv.alertIt('danger', 'Les mots de passe saisis ne sont pas identiques.');
				}else if($scope.newUser.mail.length > 200){
					// V�rif Mail
					$scope.alerts = utilSrv.alertIt('danger', 'Le mail ne doit pas d\u00e9passer 200 caract\u00e8res.');
				}else if(!utilSrv.validateEmail($scope.newUser.mail)){
					// V�rif Regex Mail
					$scope.alerts = utilSrv.alertIt('danger', 'Le mail saisi n\est pas correct.');
				}else if($scope.newUser.cp.length > 10){
					// V�rif CP
					$scope.alerts = utilSrv.alertIt('danger', 'Le code postal ne doit pas d\u00e9passer 10 caract\u00e8res.');
				}else if(!utilSrv.validateNum($scope.newUser.cp)){
					// V�rif Regex CP
					$scope.alerts = utilSrv.alertIt('danger', 'Le code postal saisi n\est pas correct.');
				}else if($scope.newUser.pseudo.length > 100){
					// V�rif Pseudo
					$scope.alerts = utilSrv.alertIt('danger', 'Le pseudo ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.newUser.password.length > 100){
					// V�rif Psw
					$scope.alerts = utilSrv.alertIt('danger', 'Le mot de passe ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.newUser.ville.length > 100){
					// V�rif Ville
					$scope.alerts = utilSrv.alertIt('danger', 'Le ville ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.newUser.rue.length > 100){
					// V�rif Rue
					$scope.alerts = utilSrv.alertIt('danger', 'La rue ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.newUser.tel.length > 20){
					// V�rif Tel si renseign�
					 $scope.alerts = utilSrv.alertIt('danger', 'Le t\u00e9l\u00e9phone ne doit pas d\u00e9passer 20 caract\u00e8res.');
				}else{
					$timeout(function() {
						$scope.$apply(function () {
							$scope.showSpinner = true;
						});
						newAccountSrv.createNewAccount($scope.newUser).then(function(d) {
							if(d){
								if(d.create){
									$scope.showSpinner = false;
									$scope.login();
									$scope.alerts = utilSrv.alertIt('success', 'Votre compte a bien \u00e9t\u00e9 cr\u00e9\u00e9.');
								}else{
									$scope.alerts = utilSrv.alertIt('danger', d.lib1);
								}
							}else{
								$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre compte.');
							}
						}, function(errResponse) {
							$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre compte.');
						});
					}, 0);
				}
			}
			
			// Logger l'utilisateur une fois qu'il a bien �t� cr��:
			$scope.login = function(){
				authSrv.getUser($scope.newUser.mail, $scope.newUser.password).then(function(d) {
					$rootScope.user = d;
				}, function(errResponse) {
					$scope.logalerts = utilSrv.alertIt('danger', 'Une erreur est survenue lors de la r\u00e9cup\u00e9ration de l\'utilisateur.');
					$scope.showModal = true;
				});
			}
			
			// Init:
			$scope.init();
} ]);