App.directive('rdLoading', [ '$timeout', function($timeout) {
	return {
		restrict : 'AE',
		template : '<div class="modal-backdrop fade in"><div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>',
		link : function($scope, $element, $attr) {
			$scope.$watch($attr.visible, function(value) {
				if (!value) {
					// We must reevaluate the value in case it was changed by a subsequent watch handler in the digest.
					if ($scope.$eval($attr.visible)) {
					}else{
					}
				}
			});
		}
	};
} ]);