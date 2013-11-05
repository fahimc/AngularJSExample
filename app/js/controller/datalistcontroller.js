controllers.DataListController = function($scope, $http, StockDataService) {
	function init() {
		$scope.$on(StockDataService.EVENT_ON_DATA_COMPLETE,onDataLoaded);
		getData();
	}

	function getData() {
		StockDataService.get($scope);
	}
	
	function onDataLoaded(event,data)
	{
		console.log("onDataLoaded",data.query);
		if(!$scope.data)$scope.data={};
		
		$scope.data.title = StockDataService.COMPANY;
		$scope.data.stock = data.query.results.quote;
	}

	init();
};
