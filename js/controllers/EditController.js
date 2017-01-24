app.controller('EditController', ['$scope','$location', '$routeParams', '$firebaseObject', 'FBURL',function($scope, $location, $routeParams, $firebaseObject, FBURL){
    var ref = new Firebase(FBURL + $routeParams.id);
    $scope.feedObj = $firebaseObject(ref);
    console.log($scope.feedObj);
    //alert("mai aa gaya");
    $scope.editFeed = function() {
        $scope.feedObj.$save({
            location:$scope.feedObj.title,
            type:$scope.feedObj.type,
            message:$scope.feedObj.message,
            lat:$scope.feedObj.lat,
            lng:$scope.feedObj.lng,
            intensity:$scope.feedObj.intensity,
            time:$scope.feedObj.time
        });
        $location.path('/pro');

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