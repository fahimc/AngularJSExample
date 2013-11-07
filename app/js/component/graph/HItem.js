var HItem = function()
{
	this.line=null;
	this.field =null;
	this.build();
};
(function()
{
	HItem.prototype = new CanvasDisplayObject(); 
	HItem.prototype.constructor =CanvasDisplayObject.prototype;
	
	var _  =HItem.prototype;
	//build each item
	_.build=function()
	{
		CanvasDisplayObject.prototype.build.call(this);
		
		
		//create a line
		this.line = new Sprite();
		this.line.moveTo(0,0);
		this.line.lineTo(0,10);
		this.line.style.strokeStyle("#FFFFFF");
		
		this.appendChild(this.line);
		
		//create a textfield
		//create a textfield
		this.field = new TextField();
		this.field.build();
		this.field.style.font('11px Arial');
		this.field.color('#FFFFFF');
		this.field.style.y(15);
		this.appendChild(this.field);
		
	};
	//add text to the legend
	_.text=function(value)
	{
		this.field.text(value);
	};
	//set the new position
	_.position=function()
	{
		this.line.moveTo(0,0);
		this.line.lineTo(0,10);
	};
})();
