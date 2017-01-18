app.controller('ListController', ['$scope', '$firebaseArray', '$firebaseObject','FBURL', function($scope,$firebaseArray, $firebaseObject, FBURL){
	
	var link = new Firebase(FBURL);
	//gettin all the data
	$scope.feeds = $firebaseArray(link);
	console.log($scope.feeds);

	//To delete Feed
	$scope.deleteFeed = function(id) {
		console.log(id);
	    var ref = new Firebase(FBURL + id);
	    var feed2delete = $firebaseObject(ref);
	    feed2delete.$remove();
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
	$scope.BGColor=function(intensity){
		if(intensity=='high')
			return 'panel-danger';
		else if(intensity=='medium')
			return 'panel-warning';
		else
			return 'panel-success';
	};
	
}]);