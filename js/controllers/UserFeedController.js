app.controller('UserFeedController', ['$scope', '$firebaseArray', '$firebaseObject','$location','FBURL3','FBURL2','FBURL', function($scope,$firebaseArray, $firebaseObject, $location, FBURL3, FBURL2, FBURL){
	
	var link = new Firebase(FBURL2);
	//gettin all the data
	$scope.feeds = $firebaseArray(link);
	console.log($scope.feeds);

	// Setting indore coordinate as user will not have it.
	$scope.lat=22.7196;
	$scope.lng=75.8577;

	//To delete Feed
	$scope.deleteFeed = function(id) {
		console.log(id);
	    var ref = new Firebase(FBURL2 + id);
	    var feed2delete = $firebaseObject(ref);
	    feed2delete.$remove();
   	};
   	//to feel modal value
   	$scope.setModalValue=function(feedObj){
   		$scope.location= feedObj.location;
   		$scope.type=feedObj.type;
   		$scope.message = feedObj.message;
   		$scope.intensity = feedObj.intensity;
   		$scope.id = feedObj.$id;
   	}

   	//to publish feed
   	$scope.publishFeed = function() {
		var ref = new Firebase(FBURL);
		var feeds = $firebaseArray(ref);
		var t=new Date();
		$scope.time= t.toISOString();
		feeds.$add({
			location:$scope.location,
			type:$scope.type,
			message: $scope.message,
			lat:$scope.lat,
			lng:$scope.lng,
			intensity:$scope.intensity,
			time:$scope.time,
		});
		$scope.deleteFeed($scope.id);
		$location.path('/');
	};

	//to save feed as a Draft
	$scope.saveDraft = function() {
		var ref = new Firebase(FBURL3);
		var feeds = $firebaseArray(ref);
		var t=new Date();
		$scope.time= t.toISOString();
		feeds.$add({
			location:$scope.location,
			type:$scope.type,
			message: $scope.message,
			lat:$scope.lat,
			lng:$scope.lng,
			intensity:$scope.intensity,
			time:$scope.time,
		});
		$scope.deleteFeed($scope.id);
		$location.path('/drafts');
	};

	//display time in proper format
	$scope.showTime=function(feedtime){
		//diff of minutes
	  	var oneMin = 60*1000;
	  	var feedT=new Date(feedtime);
	  	var currT=new Date();

	  	var diff=Math.round((feedT.getTime() - currT.getTime())/(oneMin));

	  	//If invalid time 
	  	if(feedtime===undefined)
	  		return "1 Hour Ago";

	  	//just now
	  	if(diff==0)
	  		return "Just Now";
	  	//days ago
	  	if(Math.abs(diff)>1439){
	  		diff=Math.round(diff/1440);
	  		return Math.abs(diff)+" Days Ago";
	  	}
	  	//hours ago
	  	if(Math.abs(diff)>59){
	  		diff=Math.round(diff/60);
	  		return Math.abs(diff)+" Hours Ago";
	  	}
	  	//minutes ago
	  	return Math.abs(diff) +" Minutes Ago";
	}

	//background color of feed panel
	$scope.BGColor=function(color){
		if(color=='high')
			return 'panel-danger';
		else if(color=='medium')
			return 'panel-warning';
		else 
			return 'panel-success';
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