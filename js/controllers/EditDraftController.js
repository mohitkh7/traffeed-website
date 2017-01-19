app.controller('EditDraftController', ['$scope','$location', '$routeParams', '$firebaseObject','$firebaseArray', 'FBURL3','FBURL',function($scope, $location, $routeParams, $firebaseObject,$firebaseArray, FBURL3, FBURL){

    var ref = new Firebase(FBURL3 + $routeParams.id);
    $scope.feedObj = $firebaseObject(ref);
    console.log($scope.feedObj);
    
    //To Edit Draft and save it as draft
    $scope.editDraft = function() {
        $scope.feedObj.$save({
            title:$scope.feedObj.title,
            message:$scope.feedObj.message,
            stripcolor:$scope.feedObj.stripcolor,
            time:$scope.feedObj.time
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
            time:$scope.time,
        });
	$scope.deleteDraft($routeParams.id);
        //$("#myModal").modal("hide");
        $location.path('/');
    
    }
}]);
