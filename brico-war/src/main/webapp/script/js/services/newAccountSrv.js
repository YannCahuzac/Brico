App.factory('newAccountSrv', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    return {        
    	createNewAccount: function(newUser) {
	    	return $http.post('/brico-war/action/createNewAccount', newUser)
	    		.then(
	    				function(response){
	    					return response.data;
	    				}, 
	    				function(errResponse){
	    					console.error('Une erreur est survenue lors de la creation du compte.');
	    					return $q.reject(errResponse);
	    				}
	    		);
	    }     
    };
}]);