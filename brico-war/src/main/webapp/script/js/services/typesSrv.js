App.factory('typesSrv', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    return {        
    		getTypes: function() {
		    	return $http({
								method: 'GET',
								url: '/brico-war/action/getTypes/'})
								.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
											console.error('Une erreur est survenue lors de la recuperation des types de posts de l\'application.');
											return $q.reject(errResponse);
									}
								);
		    },        
    };
}]);