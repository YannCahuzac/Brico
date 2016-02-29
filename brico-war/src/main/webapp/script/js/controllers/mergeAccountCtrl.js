App.controller('mergeAccountCtrl', [ '$scope', '$element','$rootScope', 'mergeAccountSrv', 'utilSrv', 'authSrv', '$timeout',
		function($scope, $element, $rootScope, mergeAccountSrv, utilSrv, authSrv, $timeout) {
			
			// Etat du spinner lors d'une validation de formulaire:
			$scope.showSpinner = false;	
	
			$scope.alerts = [];
			$scope.closeAlert = function(index) {
				utilSrv.closeAlert($scope.alerts, index);
			};

			$scope.mergeUser = null;
			
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
				$scope.mergeUser = initUser();
			}
			
			// Méthode de vérification des champs obligatoires:
			$scope.checkMandatoyFields = function(){
				var error = false;
				if(
					!($scope.mergeUser != null 
					&& $scope.mergeUser.pseudo != null && $scope.mergeUser.pseudo !== ''
					&& $scope.mergeUser.password != null && $scope.mergeUser.password !== '' 
					&& $scope.mergeUser.password2 != null && $scope.mergeUser.password2 !== ''
					&& $scope.mergeUser.mail != null && $scope.mergeUser.mail !== ''
					&& $scope.mergeUser.ville != null && $scope.mergeUser.ville !== ''
					&& $scope.mergeUser.cp != null && $scope.mergeUser.cp !== ''
					&& $scope.mergeUser.rue != null && $scope.mergeUser.rue !== '')
				){
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez renseigner tous les champs obligatoires.');
				} else if(
					$scope.mergeUser.password != null && $scope.mergeUser.password !== '' 
					&& $scope.mergeUser.password2 != null && $scope.mergeUser.password2 !== '' 
					&& $scope.mergeUser.password !== $scope.mergeUser.password2
					)
				{
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Les mots de passe saisis ne sont pas identiques.');
				}else if($scope.mergeUser.mail.length > 200){
					// Vérif Mail
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le mail ne doit pas d\u00e9passer 200 caract\u00e8res.');
				}else if(!utilSrv.validateEmail($scope.mergeUser.mail)){
					// Vérif Regex Mail
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le mail saisi n\est pas correct.');
				}else if($scope.mergeUser.cp.length > 10){
					// Vérif CP
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le code postal ne doit pas d\u00e9passer 10 caract\u00e8res.');
				}else if(!utilSrv.validateNum($scope.mergeUser.cp)){
					// Vérif Regex CP
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le code postal saisi n\est pas correct.');
				}else if($scope.mergeUser.pseudo.length > 100){
					// Vérif Pseudo
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le pseudo ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.mergeUser.password.length > 100){
					// Vérif Psw
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le mot de passe ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.mergeUser.ville.length > 100){
					// Vérif Ville
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le ville ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.mergeUser.rue.length > 100){
					// Vérif Rue
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'La rue ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.mergeUser.tel.length > 20){
					// Vérif Tel si renseigné
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le t\u00e9l\u00e9phone ne doit pas d\u00e9passer 20 caract\u00e8res.');
				}
				return error;
			}

			// Méthode pour merger un compte en base:
			$scope.mergeAccount = function(isModeCreate){
				$timeout(function() {
					$scope.$apply(function () {
						$scope.showSpinner = true;
					});
					mergeAccountSrv.mergeAccount($scope.mergeUser).then(function(d) {
						$scope.showSpinner = false;
						if(d){
							if(d.create){
								$scope.login();
								$scope.init();
								if(isModeCreate){
									$scope.alerts = utilSrv.alertIt('success', 'Votre compte a bien \u00e9t\u00e9 cr\u00e9\u00e9.');
								}else{
									$scope.alerts = utilSrv.alertIt('success', 'Votre compte a bien \u00e9t\u00e9 mis \u00e0 jour.');
								}
							}else{
								$scope.alerts = utilSrv.alertIt('danger', d.lib1);
							}
						}else{
							if(isModeCreate){
								$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre compte.');
							}else{
								$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la mise \u00e0 jour. de votre compte.');
							}
						}
					}, function(errResponse) {
						$scope.showSpinner = false;
						if(isModeCreate){
							$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la cr\u00e9ation de votre compte.');
						}else{
							$scope.alerts = utilSrv.alertIt('danger', 'Un probl\u00e8me est survenu lors de la mise \u00e0 jour. de votre compte.');
						}
					});
				}, 0)
			}
			
			// Méthode pour créer un nv compte:
			$scope.createNewAccount = function(){
				if(!$scope.checkMandatoyFields()){
					$scope.mergeAccount(true);
				}
			}
			
			// Logger l'utilisateur une fois qu'il a bien été créé:
			$scope.login = function(){
				authSrv.getUser($scope.mergeUser.mail, $scope.mergeUser.password).then(function(d) {
					$rootScope.user = d;
				}, function(errResponse) {
					$scope.logalerts = utilSrv.alertIt('danger', 'Une erreur est survenue lors de la r\u00e9cup\u00e9ration de l\'utilisateur.');
					$scope.showModal = true;
				});
			}
			
			// Init:
			$scope.init();
} ]);