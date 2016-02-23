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
			},
			validateEmail : function(email){
				// var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
				var re = /^[A-Za-z0-9]+((\w)?[A-Za-z0-9])*@[a-zA-Z]+((\w)?[A-Za-z0-9])*\.[a-zA-Z]{2,3}$/;
			    return re.test(email);
			},
			validateNum : function(num){
				var re = /^[1-9][0-9]*$/;
				return re.test(num);
			}
		};
}]);