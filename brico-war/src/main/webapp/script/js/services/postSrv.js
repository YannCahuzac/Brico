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
		    },         
		    getPostsByPostId: function(postId) {
		    	return $http({
		    		method: 'GET',
		    		url: '/brico-war/action/getPostsByPostId/' + postId})
		    		.then(
		    				function(response){
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la recuperation des posts.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    },         
		    getPostsByUserId: function(userId) {
		    	return $http({
		    		method: 'GET',
		    		url: '/brico-war/action/getPostsByUserId/' + userId})
		    		.then(
		    				function(response){
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la recuperation des posts.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    },         
		    getRecentsPosts: function() {
		    	return $http({
		    		method: 'GET',
		    		url: '/brico-war/action/getRecentsPosts'})
		    		.then(
		    				function(response){
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la recuperation des posts.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    },         
		    createPost: function(postDao) {
		    	return $http.post('/brico-war/action/createPost', postDao)
		    		.then(
		    				function(response){
		    					return response.data;
		    				}, 
		    				function(errResponse){
		    					console.error('Une erreur est survenue lors de la creation du post.');
		    					return $q.reject(errResponse);
		    				}
		    		);
		    },         
		    validatePost: function(postDao) {
		    	return $http.post('/brico-war/action/validatePost', postDao)
		    	.then(
		    			function(response){
		    				return response.data;
		    			}, 
		    			function(errResponse){
		    				console.error('Une erreur est survenue lors de la validation du post.');
		    				return $q.reject(errResponse);
		    			}
		    	);
		    },         
		    voteThisPost: function(postDao) {
		    	return $http.post('/brico-war/action/voteThisPost', postDao)
		    	.then(
		    			function(response){
		    				return response.data;
		    			}, 
		    			function(errResponse){
		    				console.error('Une erreur est survenue lors du vote du post.');
		    				return $q.reject(errResponse);
		    			}
		    	);
		    },         
		    findStringInPosts: function(s, posts) {
		    	var postsFiltered = [];
		    	posts.forEach(function (element, index, array){
		    		if(posts[index].title.toUpperCase().indexOf(s.toUpperCase()) > -1 || posts[index].dateCreaS.indexOf(s) > -1 || 
		    				(posts[index].userDao !== null && posts[index].userDao.cp !== null && posts[index].userDao.cp.toUpperCase().indexOf(s.toUpperCase()) > -1)){
		    			postsFiltered.push(posts[index]);
		    		}
		    	});
		    	return postsFiltered;
		    }         
    };
}]);