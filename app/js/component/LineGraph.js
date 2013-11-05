/**
 * @constructor
 */
var LineGraph = function() {
		/** @property {String} type this sets the type*/
	this.data =null;
		/**
	 set the render source
	 @public 
	 */
	this.build = function() {
		CanvasDisplayObject.prototype.build.call(this);
		
		
	};
};
(function() {
	LineGraph.prototype = new CanvasDisplayObject();
	LineGraph.prototype.constructor = CanvasDisplayObject;

})();
