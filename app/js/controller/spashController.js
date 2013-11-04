controllers.SplashController=function($scope,$location)
{
	$scope.goto=function(path)
	{
		 $location.path( path );
	};
};
