app.controller('AddController', ['$scope', '$firebaseArray', '$location', 'FBURL','FBURL3', function($scope, $firebaseArray, $location, FBURL,FBURL3){

	$scope.type="Traffic Jam";
	$scope.intensity="medium";
	
	$scope.addNewFeed = function() {
		var ref = new Firebase(FBURL);
		var feeds = $firebaseArray(ref);
		var t=new Date();
		$scope.time= t.toISOString();
		feeds.$add({
			location:$scope.location,
			type:$scope.type,
			message: $scope.message,
			intensity:$scope.intensity,
			time:$scope.time,
		});
		//$("#myModal").modal("hide");
		$location.path('/');
	};
	$scope.draftNewFeed = function() {
		var ref = new Firebase(FBURL3);
		var feeds = $firebaseArray(ref);
		var t=new Date();
		$scope.time= t.toISOString();
		feeds.$add({
			location:$scope.location,
			type:$scope.type,
			message: $scope.message,
			intensity:$scope.intensity,
			time:$scope.time,
		});
		//$("#myModal").modal("hide");
		$location.path('/drafts');
	};

}]);