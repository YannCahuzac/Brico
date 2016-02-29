App.controller('MasterCtrl', ['$scope', '$cookieStore', 'authSrv', '$rootScope', 'themesSrv', 'utilSrv', '$state', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, authSrv, $rootScope, themesSrv, utilSrv, $state) {

	// Gestion des erreurs: 
	$scope.alerts = [];
	$scope.logalerts = [];
    $scope.closeAlert = function(index) {
        utilSrv.closeAlert($scope.alerts, index);
        utilSrv.closeAlert($scope.logalerts, index);
    };
	
    /************ Sidebar Toggle & Cookie Control **************/
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
    /********** Fin Sidebar Toggle & Cookie Control ************/
    
    /*********************** Connexion *************************/
	$scope.mail;
	$scope.psw;
	
	$scope.showModal = false;
	$scope.toggleModal = function() {
		$scope.closeAlert();
		$scope.showModal = !$scope.showModal;
	};
	
	$scope.login = function(){
		authSrv.getUser($scope.mail, $scope.psw).then(function(d) {
			$rootScope.user = d;
			$scope.closeAlert();
			$scope.showModal = false;
			if($state.current.name === 'postByIdUser' || $state.current.name === 'newPost' || $state.current.name === 'postById' || $state.current.name === 'newAccount'){
				// On recharge la page car sinon rien ne se passe:
				console.log("Rechargement du state!");
				$state.reload();
			}
		}, function(errResponse) {
			$scope.logalerts = utilSrv.alertIt('danger', 'Echec de l\'authentification: mauvais login ou mot de passe.');
			$scope.showModal = true;
		});
	}
	
	$scope.logout = function(){
		authSrv.logout($rootScope.user).then(function(d) {
			if(d){
				$rootScope.user = null;
				$scope.showModal = false;
				if($state.current.name === 'postByIdUser' || $state.current.name === 'newPost' || $state.current.name === 'updateAccount'){
					// On recharge la page car sinon rien ne se passe:
					console.log("Rechargement du state!");
					$state.reload();
				}
			}else{
				$scope.logalerts = utilSrv.alertIt('danger', 'Une erreur est survenue lors de la d\u00e9connexion.');
			}
		}, function(errResponse) {
			$scope.logalerts = utilSrv.alertIt('danger', 'Une erreur est survenue lors de la d\u00e9connexion.');
		});
	}
	/********************* Fin Connexion ***********************/

	/*********************** Get Themes ************************/
	
	$rootScope.themes = [];
	
	// Retourne tous les themes de l'application:
	$scope.getThemes = function() {
		themesSrv.getThemes().then(function(d) {
			$rootScope.themes = d;
		}, function(errResponse) {
			$scope.alerts = utilSrv.alertIt('danger', errResponse.statusText);
		});
	};
	
	$scope.getThemes();
	/*********************** Fin Themes ************************/
}