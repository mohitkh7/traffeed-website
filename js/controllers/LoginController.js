// Login Controller

app.controller('LoginController',function($scope,accessFac,$location){
	$scope.userE=false;
	$scope.userP=false;
    $scope.getAccess = function(){
        accessFac.getPermission();       //call the method in acccessFac to allow the user permission.
        //alert("jai");
        $location.path('/');

    }
    $scope.check=function(){
    	if($scope.username=="admin" && $scope.password=="123456")
    		$scope.getAccess();
    	else{
    		if($scope.username!="admin")
    			$scope.userE=true;
    		else
    			$scope.userE=false;

    		if($scope.password!="123456")
    			$scope.userP=true;
    		else
    			$scope.userP=false;
    	}
    }
});

//app.controller('EditDraftController', ['$scope','$location',function($scope, $location, $routeParams ){