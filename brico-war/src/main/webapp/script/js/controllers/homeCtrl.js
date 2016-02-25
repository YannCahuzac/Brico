App.controller('homeCtrl', [ '$scope', 'postSrv', 'utilSrv', function($scope, postSrv, utilSrv) {

	$scope.posts = [];
	$scope.postsFiltered = [];
	$scope.filter = '';
	
	// Gestion des erreurs: 
	$scope.alerts = [];
    $scope.closeAlert = function(index) {
        utilSrv.closeAlert($scope.alerts, index);
    };
	
	$scope.config = {
		    itemsPerPage: 10,
		    fillLastPage: true,
		    paginatorLabels: {
		        stepBack: '\u003c',
		        stepAhead: '\u003e',
		        jumpBack: '\u00ab',
		        jumpAhead: '\u00bb',
		        first: 'D\u00e9but',
		        last: 'Fin'
		    }
	}

	// Recupere les plus recents posts cote serveur:
	$scope.getRecentsPosts = function() {
		postSrv.getRecentsPosts().then(function(d) {
			$scope.posts = d;
			$scope.postsFiltered = d;
		}, function(errResponse) {
			$scope.alerts = utilSrv.alertIt('danger', 'Aucun post n\' a \u00e9t\u00e9 recup\u00e9r\u00e9.');
		});
	};
	
	// Init:
	$scope.getRecentsPosts();
	
	$scope.findStringInPosts = function(){
		 $scope.postsFiltered = postSrv.findStringInPosts($scope.filter, $scope.posts);
	}
	
} ]);