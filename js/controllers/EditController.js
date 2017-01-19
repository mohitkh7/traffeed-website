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
            intensity:$scope.feedObj.intensity,
            time:$scope.feedObj.time
        });
        $location.path('/pro');

    };

}]);