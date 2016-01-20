/**
 * Master Controller
 */

angular.module('bricoAngular')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'authSrv', '$rootScope', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, authSrv, $rootScope) {
    /**
     * Sidebar Toggle & Cookie Control
     */
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
    
    /*********************** Connexion *************************/
	$scope.mail;
	$scope.psw;
	
	$scope.showModal = false;
	$scope.toggleModal = function() {
		$scope.showModal = !$scope.showModal;
	};
	
	$scope.login = function(){
		$rootScope.user = authSrv.getUser($scope.mail, $scope.psw);
		console.log($scope.mail);
		console.log($scope.psw);
		console.log($rootScope.user);
		$scope.showModal = false;
	}
	
	$scope.logout = function(){
		$rootScope.user = null;
		$scope.showModal = false;
	}
	/********************* Fin Connexion ***********************/
}