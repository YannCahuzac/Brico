'use strict';
 
App.factory('themesSrv', ['$http', '$q', function($http, $q){
    return {
            getThemes: function() {
                    return $http.get('http://localhost:8080/brico-war/action/getThemes/')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Une erreur est survenue lors de la récupération des thèmes de l\'application.');
                                        return $q.reject(errResponse);
                                    }
                            );
            }         
    };
}]);