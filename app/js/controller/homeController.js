controllers.HomeController=function($scope,$http)
{
	$http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json')
       .then(function(res){
       	console.log(res.data);
          $scope.todos = res.data;                
        });
};
