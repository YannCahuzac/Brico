'use strict';

App.controller('newSubCtrl', [ '$scope', '$element', 'utilSrv',
		function($scope, $element, utilSrv) {

			$scope.selectedTheme;
			$scope.demande = '';
			
			$scope.alerts = [];
		    $scope.closeAlert = function(index) {
		        utilSrv.closeAlert($scope.alerts, index);
		    };
						
			$scope.submitNewSub = function(){
				if($scope.demande === '' || $('select option:selected').val() === '' || $('select option:selected').val() === undefined){
					$scope.alerts = utilSrv.alertIt('danger', 'Veuillez s\u00e9lectionner un th\u00e8me et d\u00e9crire votre requ\u00eate pour valider le formulaire.');
				}else{
					// TODO Enregistrement Server
					$scope.alerts = utilSrv.alertIt('success', 'Votre requ\u00eate a bien \u00e9t\u00e9 prise en compte et sera accessible dans le th\u00e8me choisi.');
				}
			}
} ]);