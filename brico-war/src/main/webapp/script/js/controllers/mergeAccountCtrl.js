// Ce controller est utilisé pour 2 states définis dans app.js: newAccount et updateAccount.
App.controller('mergeAccountCtrl', [ '$scope', '$element','$rootScope', 'mergeAccountSrv', 'utilSrv', 'authSrv', '$timeout', '$state', 
		function($scope, $element, $rootScope, mergeAccountSrv, utilSrv, authSrv, $timeout, $state) {
			
			// Etat du spinner lors d'une validation de formulaire:
			$scope.showSpinner = false;	
	
			$scope.alerts = [];
			$scope.closeAlert = function(index) {
				utilSrv.closeAlert($scope.alerts, index);
			};

			$scope.mergeUser = null;
			// Etat du ctrl: create ou update
			$scope.state = '';
			// Etat de la creation ou de la mise à jour:
			$scope.merge = 'ko';
			
			// NB: Quand on valide le formulaire, les champs required doivent être renseignés:
			var initOldUser = function(){
				if($rootScope.user != null){
					return {
						idUser : $rootScope.user.idUser,
						dateCreation : $rootScope.user.dateCreation,
						pseudo : $rootScope.user.pseudo,
						password0 : '',
						password : '',
						password2 : '',
						tel : $rootScope.user.tel,
						mail : $rootScope.user.mail,
						ville : $rootScope.user.ville,
						cp : $rootScope.user.cp,
						rue : $rootScope.user.rue,
						nbVotes : $rootScope.user.nbVotes,
						note : $rootScope.user.note,
						role : $rootScope.user.role
					};
				}else{
					return null;
				}
			}
			
			var initNewUser = function(){
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
			
			$scope.initExistingUser = function(){
				$scope.mergeUser = initOldUser();
			}

			$scope.init = function(){
				$scope.mergeUser = initNewUser();
			}
			
			// Méthode de vérification des champs obligatoires:
			$scope.checkMandatoyFields = function(){
				var error = false;
				if(
						$scope.state == 'U'	&&	
						!($scope.mergeUser.ville != null && $scope.mergeUser.ville !== ''
						&& $scope.mergeUser.cp != null && $scope.mergeUser.cp !== ''
						&& $scope.mergeUser.rue != null && $scope.mergeUser.rue !== '')
				){
					// MODE UPDATE
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez renseigner tous les champs obligatoires.');
				}else if(
						$scope.state == 'U'
						&& ( 
						$scope.mergeUser.password0 != null && $scope.mergeUser.password0.length > 100
						|| $scope.mergeUser.password != null && $scope.mergeUser.password.length > 100
						|| $scope.mergeUser.password2 != null && $scope.mergeUser.password2.length > 100
						)
				){
					// MODE UPDATE
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le mot de passe ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if(
					$scope.state == 'N' &&
					!($scope.mergeUser != null 
					&& $scope.mergeUser.pseudo != null && $scope.mergeUser.pseudo !== ''
					&& $scope.mergeUser.password != null && $scope.mergeUser.password !== '' 
					&& $scope.mergeUser.password2 != null && $scope.mergeUser.password2 !== ''
					&& $scope.mergeUser.mail != null && $scope.mergeUser.mail !== ''
					&& $scope.mergeUser.ville != null && $scope.mergeUser.ville !== ''
					&& $scope.mergeUser.cp != null && $scope.mergeUser.cp !== ''
					&& $scope.mergeUser.rue != null && $scope.mergeUser.rue !== '')
				){
					// MODE CREATE
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez renseigner tous les champs obligatoires.');
				} else if(
					$scope.state == 'N' &&
					$scope.mergeUser.password != null && $scope.mergeUser.password !== '' 
					&& $scope.mergeUser.password2 != null && $scope.mergeUser.password2 !== '' 
					&& $scope.mergeUser.password !== $scope.mergeUser.password2
					)
				{
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Les mots de passe saisis ne sont pas identiques.');
					
				}else if(
					$scope.state == 'U' 
					&& $scope.mergeUser.password0 != null && $scope.mergeUser.password0 !== ''
					&& (
							$scope.mergeUser.password === '' 
							|| $scope.mergeUser.password2 === '' 
						)
				){
					// MODE UPDATE
					// Vérif psw remplis
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Vous devez renseigner les mots de passe.');
				}else if(
					$scope.state == 'U' 
					&& $scope.mergeUser.password0 != null && $scope.mergeUser.password0 !== ''
					&& $scope.mergeUser.password !== $scope.mergeUser.password2
				){
					// MODE UPDATE
					// Vérif psw identiques
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Les mots de passe saisis ne sont pas identiques.');
				}else if($scope.state == 'N' && $scope.mergeUser.mail.length > 200){
					// MODE CREATE
					// Vérif Mail
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le mail ne doit pas d\u00e9passer 200 caract\u00e8res.');
				}else if($scope.state == 'N' && !utilSrv.validateEmail($scope.mergeUser.mail)){
					// MODE CREATE
					// Vérif Regex Mail
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le mail saisi n\est pas correct.');
				}else if($scope.mergeUser.cp.length != 5){
					// Vérif CP
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le code postal doit comporter 5 caract\u00e8res num\u00e9riques.');
				}else if(!utilSrv.validateNum($scope.mergeUser.cp)){
					// Vérif Regex CP
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le code postal saisi n\est pas correct.');
				}else if($scope.state == 'N' && $scope.mergeUser.pseudo.length > 100){
					// MODE CREATE
					// Vérif Pseudo
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le pseudo ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.mergeUser.password != null && $scope.mergeUser.password.length > 100){
					// Vérif Psw
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'Le mot de passe ne doit pas d\u00e9passer 100 caract\u00e8res.');
				}else if($scope.mergeUser.ville.length > 100){
					// Vérif Ville
					error = true;
					$scope.alerts = utilSrv.alertIt('danger', 'La ville ne doit pas d\u00e9passer 100 caract\u00e8res.');
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
								// Success:
								$scope.merge = 'ok';
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
			$scope.submitAccount = function(){
				if(!$scope.checkMandatoyFields()){
					if($scope.state == 'N'){
						$scope.mergeAccount(true);
					}else if($scope.state == 'U'){
						// MODE UPDATE
						var update = true;
						// Remplissage du psw user:
						if($scope.mergeUser.password0 != null && $scope.mergeUser.password0 !== '') {
							// L'utilisateur a rempli psw0 donc il souhaite faire une MàJ du psw:
							if($scope.mergeUser.password0 !== $rootScope.user.password){
								// Vérification que le psw0 saisi est bien l'ancien psw.
								update = false;
								$scope.alerts = utilSrv.alertIt('danger', 'L\'ancien mot de passe saisi ne correspond pas \u00e0 votre ancien mot de passe.');
							}
						}else{
							// L'utilisateur n'a pas rempli psw0 donc il ne souhaite pas faire une MàJ du psw.
							// On remet donc l'ancien psw dans le champs user psw qu'on enverra ensuite au serveur:
							$scope.mergeUser.password = $rootScope.user.password;
						}
						if(update){
							$scope.mergeAccount(false);
						}
					}
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
			
			if($state.current.name === 'newAccount'){
				$scope.state = 'N';
				if(!$rootScope.user){
					// Init:
					$scope.init();
				}else{
					$state.go('updateAccount');
				}
			}else if($state.current.name === 'updateAccount'){
				$scope.state = 'U';
				if($rootScope.user){
					console.log('initExistingUser');
					// Init:
					$scope.initExistingUser();
				}else{
					console.log('redirect');
					$state.go('newAccount');
				}
			}
} ]);