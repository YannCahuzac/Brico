'use strict';

App.controller('homeCtrl', [ '$scope', 'postSrv', function($scope, postSrv) {

	$scope.posts = [];
	
	// Gestion des erreurs: 
	$scope.alerts = [];
    $scope.closeAlert = function(index) {
        utilSrv.closeAlert($scope.alerts, index);
    };
	
	$scope.config = {
		    itemsPerPage: 10,
		    fillLastPage: true,
		    paginatorLabels: {
		        stepBack: '‹',
		        stepAhead: '›',
		        jumpBack: '«',
		        jumpAhead: '»',
		        first: 'D\u00e9but',
		        last: 'Fin'
		    }
	}

	// Recupere les plus recents posts cote serveur:
	$scope.getRecentsPosts = function() {
		postSrv.getRecentsPosts().then(function(d) {
			$scope.posts = d;
		}, function(errResponse) {
			$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9.');
		});
	};
	
	// Init:
	$scope.getRecentsPosts();
	
} ]);