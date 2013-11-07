controllers.GraphController = function($scope, $http, StockDataService,$element) {
	
	var canvas=null;
	var lineGraph;
	var defaultWidth= 500;
	var defaultHeight= 350;
	function init()
	{
		
		var parent =$element[0];
		
		canvas = new Canvas();
		canvas.build();
		canvas.width(defaultWidth);
		canvas.height(defaultHeight);
		parent.appendChild(canvas.element);
		
		lineGraph = new LineGraph();
		lineGraph.style.width(defaultWidth);
		lineGraph.style.height(defaultHeight);
		
		canvas.appendChild(lineGraph);
		
		
		setListeners();
		resize();
	}
	
	function setListeners()
	{
		$scope.$on(StockDataService.EVENT_ON_DATA_COMPLETE,onDataLoaded);
		
		window.addEventListener('resize',resize);
	}
	function onDataLoaded()
	{
		lineGraph.update($scope.data);
	}
	function resize()
	{
		
		var parent =$element[0];
		canvas.width(parent.clientWidth);
		
		//work out the change ratio
		var r = parent.clientWidth/defaultWidth;
		canvas.height(defaultHeight * r);
		lineGraph.style.width(parent.clientWidth);
		lineGraph.style.height(defaultHeight * r);
		lineGraph.resize();
	}
	init();
};
