'use strict';

App.service('authSrv', [ '$http', '$rootScope', '$location',
	function($http, $rootScope, $location) {
		return {
			getUser : function(username, psw) {
				// return Restangular.one('contexte', token).get();
				var user = 
					{
						firstname:'Cahuzac',
						surname:'Yann'
					}
				return user;
			},
			redirectIfNotAuth : function() {
				if (!$rootScope.user) {
					// TODO
					$location.path('/auth');
				}
			}
		};
	} ]);