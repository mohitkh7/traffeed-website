var app = angular.module('myApp', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
	controller: 'ListController',
	templateUrl: 'views/list.html'
	})
	.when('/add', {
	controller: 'AddController',
	templateUrl: 'views/add.html'
	})
	.when('/edit/:id', {
	controller: 'EditController',
	templateUrl: 'views/edit.html'
	})
	.when('/userfeed', {
	controller: 'UserFeedController',
	templateUrl: 'views/userfeed.html'
	})
	.when('/drafts', {
	controller: 'DraftsController',
	templateUrl: 'views/drafts.html'
	})
	.when('/editdraft/:id', {
	controller: 'EditDraftController',
	templateUrl: 'views/editdraft.html'
	})
	.otherwise({
	redirectTo: '/'
	});
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
