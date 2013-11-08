var VItem = function()
{
	this.line=null;
	this.field =null;
	this.build();
	this.index=0;
};
(function()
{
	VItem.prototype = new CanvasDisplayObject(); 
	VItem.prototype.constructor =CanvasDisplayObject.prototype;
	
	var _  =VItem.prototype;
	//build each item
	_.build=function()
	{
		CanvasDisplayObject.prototype.build.call(this);
		
		
		//create a line
		this.line = new Sprite();
		this.line.moveTo(0,0);
		this.line.lineTo(0,0);
		this.line.style.strokeStyle("#666");
		this.line.style.lineWidth(1);
		
		console.log(this.line.style.lineWidth());
		this.appendChild(this.line);
		
		//create a textfield
		this.field = new TextField();
		this.field.build();
		this.field.style.font('11px Arial');
		this.field.color('#FFFFFF');
		this.appendChild(this.field);
		
		
		
	};
	//add text to the legend
	_.text=function(value)
	{
		this.field.text(value);
		this.field.style.x(-(this.field.style.width()+5));
	};
	//set the new position
	_.position=function(w)
	{
		this.line.moveTo(0,0);
		this.line.lineTo(w,0);
		this.field.style.y(-5);
	};
})();
