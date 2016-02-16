'use strict';
 
App.factory('commSrv', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    return {               
    		getCommByThemeId: function(themeId) {
		    	return $http({
		    		method: 'GET',
		    		url: '/brico-war/action/getCommByThemeId/' + themeId})
		    		.then(
		    				function(response){
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la recuperation des commentaires.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    }         
    };
}]);