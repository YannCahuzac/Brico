App.service('authSrv', [ '$http', '$rootScope', '$location', '$q',
	function($http, $rootScope, $location, $q) {
		return {
			getUser : function(mail, psw) {
		    	return $http({
			    		method: 'GET',
			    		url: '/brico-war/action/getUserByMailAndPsw/mail/' + mail + '/psw/' + psw})
			    		.then(
			    				function(response){
			    					return response.data;
			    				}, 
			    				function(errResponse){
			    					return $q.reject(errResponse);
			    				}
			    		);
			},
			logout: function(user) {
		    	return $http.post('/brico-war/action/logout', user)
		    		.then(
		    				function(response){
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la d\u00e9connexion.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    },
			redirectIfNotAuth : function() {
				if (!$rootScope.user) {
					// TODO
					$location.path('/auth');
				}
			}
		};
	} ]);