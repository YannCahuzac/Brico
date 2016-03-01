App.controller('infoCtrl', [ '$scope', '$state', function($scope, $state) {

	$scope.state = '';

	// Gestion des erreurs: 
	$scope.alerts = [];
	$scope.closeAlert = function(index) {
	    utilSrv.closeAlert($scope.alerts, index);
	};
	
	if($state.current.name === 'license'){
		$scope.state = 'L';
	}else if($state.current.name === 'aide'){
		$scope.state = 'A';
	}
	
} ]);