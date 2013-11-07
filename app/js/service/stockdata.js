services.StockDataService = function($http) {

	var service = {
		http : null,
		scope : null,
		URL : 'http://query.yahooapis.com/v1/public/yql',
		STARTDATE : '2013-09-01',
		ENDDATE : '2013-11-01',
		COMPANY : "GOOG",
		EVENT_ON_DATA_COMPLETE : "StockDataService_ON_DATA_COMPLETE",
		EVENT_ON_DATA_ERROR : "StockDataService_ON_DATA_ERROR"
	};

	service.get = function(scope) {
		
		//get todays date
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		this.ENDDATE =year + "-" + month + "-" + day;
		
		//("YHOO","AAPL","GOOG","MSFT")
		var data = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol in ("' + this.COMPANY + '") and startDate = "' + this.STARTDATE + '" and endDate = "' + this.ENDDATE + '"');

		this.scope = scope;
		this.http = $http.get(this.URL + '?q=' + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json");
		this.http.success(getHandler("onSuccess"));
		this.http.error(getHandler("onError"));
	};

	service.onSuccess = function(data, status, headers, config) {
		if(!data.query.results)return;
		this.scope.$broadcast(this.EVENT_ON_DATA_COMPLETE, data);
	};

	service.onError = function(data, status, headers, config) {
		this.scope.$broadcast(this.EVENT_ON_DATA_ERROR, data);
	};

	function getHandler(funcName) {
		var _this = service;
		var func = function(data, status, headers, config) {
			_this[funcName](data, status, headers, config);
		};
		return func;
	};

	return service;
};
