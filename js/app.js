var app = angular.module('myApp', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'ListController',
		templateUrl: 'views/list.html',
		resolve:{
			"check":function(accessFac,$location){
				if(accessFac.checkPermisssion()){

				}
				else{
					$location.path('/login');
				}
			}
		}
	})

	.when('/add', {
		controller: 'AddController',
		templateUrl: 'views/add.html',
		resolve:{
			"check":function(accessFac,$location){
				if(accessFac.checkPermisssion()){

				}
				else{
					$location.path('/login');
				}
			}
		}
	})

	.when('/edit/:id', {
		controller: 'EditController',
		templateUrl: 'views/edit.html',
		resolve:{
			"check":function(accessFac,$location){
				if(accessFac.checkPermisssion()){

				}
				else{
					$location.path('/login');
				}
			}
		}
	})
	.when('/userfeed', {
		controller: 'UserFeedController',
		templateUrl: 'views/userfeed.html',
		resolve:{
			"check":function(accessFac,$location){
				if(accessFac.checkPermisssion()){

				}
				else{
					$location.path('/login');
				}
			}
		}
	})
	.when('/drafts', {
		controller: 'DraftsController',
		templateUrl: 'views/drafts.html',
		resolve:{
			"check":function(accessFac,$location){
				if(accessFac.checkPermisssion()){

				}
				else{
					$location.path('/login');
				}
			}
		}
	})
	.when('/editdraft/:id', {
		controller: 'EditDraftController',
		templateUrl: 'views/editdraft.html',
		resolve:{
			"check":function(accessFac,$location){
				if(accessFac.checkPermisssion()){

				}
				else{
					$location.path('/login');
				}
			}
		}
	})
	.when('/login',{
		controller:'LoginController',
		templateUrl:'views/login.html',
		resolve:{
			"check":function(accessFac,$location){
				if(accessFac.checkPermisssion()){
					$location.path('/');
				}
				else{
				}
			}
		}
	})
	.otherwise({
	redirectTo: '/'
	});
});

//factory for login
app.factory('accessFac',function(){
	var obj={}
	obj.getPermission=function(){
		localStorage.setItem("login", "true");
	}
	obj.cancelPermission=function(){
		localStorage.setItem("login","false");
	}
	obj.checkPermisssion=function(){
		if(localStorage.getItem("login")=="true")
			return true;
		else
			return false;
		//return this.access;
	}
	return obj;
});

app.constant('FBURL', 
	'https://indore-traffic-updates.firebaseio.com/updates/' 
	//Use the URL of your project here with the trailing slash                                                   
);
app.constant('FBURL2', 
	'https://indore-traffic-updates.firebaseio.com/user_updates/' 
	//Use the URL of your project here with the trailing slash                                                   
);
app.constant('FBURL3',
	'https://indore-traffic-updates.firebaseio.com/drafts/'
);
