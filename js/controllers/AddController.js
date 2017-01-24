app.controller('AddController', ['$scope', '$firebaseArray', '$location', 'FBURL','FBURL3', function($scope, $firebaseArray, $location, FBURL,FBURL3){

	$scope.type="Traffic Jam";
	$scope.intensity="medium";
	$scope.lat=22.7196;
	$scope.lng=75.8577;

	$scope.addNewFeed = function() {
		var ref = new Firebase(FBURL);
		var feeds = $firebaseArray(ref);
		var t=new Date();
		$scope.time= t.toISOString();
		feeds.$add({
			location:$scope.location,
			type:$scope.type,
			message: $scope.message,
			lat: $scope.lat,
			lng: $scope.lng,
			intensity:$scope.intensity,
			time:$scope.time
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
			lat: $scope.lat,
			lng: $scope.lng,
			time:$scope.time
		});
		//$("#myModal").modal("hide");
		$location.path('/drafts');
	};

	//Google Maps Autocomplete 
	$scope.init=function(){
		//Bounding in Indore
		var southWest = new google.maps.LatLng(22.8459, 75.9504 );
	    var northEast = new google.maps.LatLng(22.6422, 75.6460 );
	    var indoreBounds = new google.maps.LatLngBounds( southWest, northEast );

	    var options = {
	        bounds: indoreBounds,
	        componentRestrictions: {country: 'in'}
	    };

		var input = document.getElementById('location');
 		var autocomplete = new google.maps.places.Autocomplete(input, options);

 		//To be run when Changed
 		google.maps.event.addListener(autocomplete, 'place_changed', function () {
     		var place = autocomplete.getPlace();

			$scope.lat = place.geometry.location.lat()
			$scope.lng = place.geometry.location.lng();

			// Then do whatever you want with them
			$scope.location=place.name;
			input.value=place.name;
			console.log(place.name);
			console.log($scope.lat);
			console.log($scope.lng);
		});
	}
	$scope.init();

}]);
