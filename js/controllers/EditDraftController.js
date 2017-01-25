app.controller('EditDraftController', ['$scope','$location', '$routeParams', '$firebaseObject','$firebaseArray', 'FBURL3','FBURL',function($scope, $location, $routeParams, $firebaseObject,$firebaseArray, FBURL3, FBURL){

    var ref = new Firebase(FBURL3 + $routeParams.id);
    $scope.feedObj = $firebaseObject(ref);
    console.log($scope.feedObj);
    
    //To Edit Draft and save it as draft
    $scope.editDraft = function() {
        $scope.feedObj.$save({
            location:$scope.feedObj.location,
            type:$scope.feedObj.type,
            message: $scope.feedObj.message,
            intensity:$scope.feedObj.intensity,
            lat:$scope.feedObj.lat,
            lng:$scope.feedObj.lng,
            time:$scope.time,
        });
        $location.path('/drafts');

    };

    //To delete Draft
    $scope.deleteDraft = function(id) {
        console.log(id);
        var ref = new Firebase(FBURL3 + id);
        var feed2delete = $firebaseObject(ref);
        feed2delete.$remove();
    };

    //To Publish Draft as Feed and delete it
    $scope.publishAsFeed=function(){
        var ref=new Firebase(FBURL);
        var feeds = $firebaseArray(ref);
        var t=new Date();
        $scope.time= t.toISOString();
        feeds.$add({
            location:$scope.feedObj.location,
            type:$scope.feedObj.type,
            message: $scope.feedObj.message,
            intensity:$scope.feedObj.intensity,
            lat:$scope.feedObj.lat,
            lng:$scope.feedObj.lng,
            time:$scope.time,
        });
		$scope.deleteDraft($routeParams.id);
        //$("#myModal").modal("hide");
        $location.path('/');
    
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

            $scope.feedObj.lat = place.geometry.location.lat()
            $scope.feedObj.lng = place.geometry.location.lng();

            // Then do whatever you want with them
            $scope.feedObj.location=place.name;
            input.value=place.name;
            console.log(place.name);
            console.log($scope.feedObj.lat);
            console.log($scope.feedObj.lng);
        });
    }

    $scope.init();
}]);
