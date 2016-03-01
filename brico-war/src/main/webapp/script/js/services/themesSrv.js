App.factory('themesSrv', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    return {        
		    getThemes: function() {
		    	return $http({
								method: 'GET',
								url: '/brico-war/action/getThemes/'})
								.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
											console.error('Une erreur est survenue lors de la recuperation des themes de l\'application.');
											return $q.reject(errResponse);
									}
								);
		    },         
		    getThemeById: function(themeId) {
		    	return $http({
		    		method: 'GET',
		    		url: '/brico-war/action/getThemeById/' + themeId})
		    		.then(
		    				function(response){
		    					console.log(response.data);
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la recuperation des themes de l\'application.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    },       
		    getThemeByIdFromRoot: function(themeId) {
		    	var ret = null;
		    	var BreakException= {};
		    	function checkIt(element, index, array) {
		    	    if(element.id1 == themeId){
		    	    	ret = $rootScope.themes[index];
		    	    	throw BreakException;
		    	    }
		    	}
		    	if($rootScope.themes){
		    		try{
		    			$rootScope.themes.forEach(checkIt);
		    		} catch(e) {
		    		    if (e === BreakException){}
		    		}
		    	}else{
		    		console.error('Il faut reinitialiser le rootScope.');
		    	}
		    	return ret;
		    }         
    };
}]);