controllers.GraphController = function($scope, $http, StockDataService,$element) {
	
	var canvas=null;
	var lineGraph;
	function init()
	{
		var parent =$element[0];
		
		canvas = new Canvas();
		canvas.build();
		canvas.width(500);
		canvas.height(350);
		parent.appendChild(canvas.element);
		
		lineGraph = new LineGraph();
		lineGraph.build();
		lineGraph.style.width(500);
		lineGraph.style.height(350);
		lineGraph.style.backgroundColor("#333");
		
		canvas.appendChild(lineGraph);
		
		resize();
	}
	function resize()
	{
		var parent =$element[0];
		console.log(parent.clientWidth);
		canvas.width(parent.clientWidth);
		canvas.height(350);
		lineGraph.style.width(parent.clientWidth);
		
	}
	init();
};
