'use strict';
 
App.factory('postSrv', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    return {               
    		getPostsByThemeId: function(themeId) {
		    	return $http({
		    		method: 'GET',
		    		url: '/brico-war/action/getPostsByThemeId/' + themeId})
		    		.then(
		    				function(response){
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la recuperation des posts.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    }         
    };
}]);