App.factory('newAccountSrv', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    return {        
    	mergeAccount: function(user) {
	    	return $http.post('/brico-war/action/mergeAccount', user)
	    		.then(
	    				function(response){
	    					return response.data;
	    				}, 
	    				function(errResponse){
	    					console.error('Une erreur est survenue lors de la creation/update du compte.');
	    					return $q.reject(errResponse);
	    				}
	    		);
	    }     
    };
}]);