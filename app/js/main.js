(function(window) {
	var app = angular.module("canvas",['ngResource','ngRoute','ngAnimate']);
	
	var config=function($routeProvider)
	{
		$routeProvider.when("/",
		{
			controller:"SplashController",
			templateUrl:"/template/view/splash.html"
		});
		$routeProvider.when("/home",
		{
			controller:"HomeController",
			templateUrl:"/template/view/home.html"
		});
		$routeProvider.otherwise({redirectTo:"/"});
	};
	
	app.config(config);
	app.controller(controllers);
	app.directive(directives);
	
} )(window); 