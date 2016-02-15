'use strict';

//Fonctions Utiles:

App.factory('utilSrv', [
    function() {
		return {
			alertIt : function(type, msg) {
				var tab = [];
				tab.push(
					{
						type: type,
						msg: msg
					});
				return tab;
			},
			closeAlert : function(tab, index){
				tab.splice(index, 1);
			}
		};
}]);