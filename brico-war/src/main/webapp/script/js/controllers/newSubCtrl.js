'use strict';

App.controller('newSubCtrl', [ '$scope', '$element',
		function($scope, $element) {

			$scope.selectedTheme;
			$scope.demande = '';

			$scope.themes = [
	           {id:174567,tag:'Plomberie'},
	           {id:256,tag:'Menuiserie'},
	           {id:378,tag:'\u00c9lectricit\u00e9'},
	           {id:478,tag:'Jardinage'},
	           {id:5785,tag:'Ma\u00e7onnerie'}
	         ];
			
			$scope.submitNewSub = function(){
				console.log("selectedTheme: " + $scope.selectedTheme + " " + $('select option:selected').val());
				console.log("demande: " + $scope.demande);
			}
			
} ]);