/**
 * @constructor
 */
var LineGraph = function() {
	/** @property {String} type this sets the type*/
	this.data = null;
	this.hLine = null;
	this.vLine = null;
	this.graphLine=null;
	this.hLinePadding = 20;
	this.vLinePadding = 20;
	this.linePaddingLeft = 30;
	this.hPaddingBottom = 60;
	this.priceLegend = [];
	this.month = new Array();
	this.month[0] = "JAN";
	this.month[1] = "FEB";
	this.month[2] = "MAR";
	this.month[3] = "APR";
	this.month[4] = "MAY";
	this.month[5] = "JUN";
	this.month[6] = "JUL";
	this.month[7] = "AUG";
	this.month[8] = "SEP";
	this.month[9] = "OCT";
	this.month[10] = "NOV";
	this.month[11] = "DEC";
	this.build();
};
(function() {
	LineGraph.prototype = new CanvasDisplayObject();
	LineGraph.prototype.constructor = CanvasDisplayObject;

	var _ = LineGraph.prototype;

	_.build = function() {
		CanvasDisplayObject.prototype.build.call(this);

		//draw horizontal line
		this.hLine = new Sprite();
		this.hLine.moveTo(this.linePaddingLeft, this.style.height() - this.hPaddingBottom);
		this.hLine.lineTo(this.style.width() - (this.hLinePadding + this.linePaddingLeft), this.style.height() - this.hPaddingBottom);
		this.hLine.style.lineWidth(2);
		this.hLine.style.strokeStyle("#FFF");

		this.appendChild(this.hLine);

		//draw vertical line
		this.vLine = new Sprite();
		this.vLine.moveTo(this.linePaddingLeft, this.style.height() - this.hPaddingBottom);
		this.vLine.lineTo(this.linePaddingLeft, this.vLinePadding);
		this.vLine.style.lineWidth(2);
		this.vLine.style.strokeStyle("#FFF");

		this.appendChild(this.vLine);

		this.label = new TextField();
		this.label.build();
		this.label.text("PRICE");
		this.label.style.rotate(-90);
		this.label.style.font('12px Arial');
		this.label.color('#FFFFFF');
		this.appendChild(this.label);
		
		this.graphLine=new Sprite();
		this.graphLine.moveTo(this.linePaddingLeft, this.style.height() - this.hPaddingBottom);
		this.graphLine.style.lineWidth(2);
		this.graphLine.style.strokeStyle("#FFF");
		this.appendChild(this.graphLine);

	};
	_.update = function(data) {
		this.data = data;

		//work out the lowest & highest price
		this.lowestAndHighest();

		this.createHItems();

		var _this = this;
		setTimeout(function() {
			_this.createVItems();
		}, 100);
		
		this.drawLine();
	};
	
	_.drawLine=function()
	{
		var w = Math.floor((this.style.width() - (this.linePaddingLeft + this.hLinePadding + 10)) / this.data.stock.length);
		var h = Math.floor((this.style.height() - (this.vLinePadding +this.hPaddingBottom)) / (this.priceLegend.length - 1));
		this.graphLine.moveTo(this.linePaddingLeft, this.style.height() - this.hPaddingBottom);
		for (var a = 0; a < this.data.stock.length; a++) {
			for (var b = 0; b < this.priceLegend.length; b++) {
				if( this.data.stock[a].Low==this.priceLegend[b])
				{
					console.log(this.data.stock[a].Low,this.priceLegend[b]);
					this.graphLine.lineTo((a * w)+ (this.linePaddingLeft + 10),(b*h)+this.vLinePadding);
				}
			}
		}
	};
	_.createHItems = function() {
		//calculate width of each price
		var w = Math.floor((this.style.width() - (this.linePaddingLeft + this.hLinePadding + 10)) / this.data.stock.length);
		for (var a = 0; a < this.data.stock.length; a++) {
			var date = new Date(this.data.stock[a].Date);
			var month = this.month[date.getMonth()];
			var item = new HItem();
			this.appendChild(item);
			item.index = a;
			item.style.y(this.style.height() - this.hPaddingBottom);
			item.style.x((a * w) + (this.linePaddingLeft + 10));
			item.position();
			if (a % 3 === 0)item.text(month);
		}
	};
	_.createVItems = function() {
		//work out the hieght of each item
		var h = Math.floor((this.style.height() - (this.vLinePadding +this.hPaddingBottom)) / (this.priceLegend.length - 1));
		for (var a = 0; a < this.priceLegend.length; a++) {
			var item = new VItem();
			this.appendChild(item);
			item.index = a;
			item.style.y((a * h) + this.vLinePadding);
			item.style.x(this.linePaddingLeft);
			item.position();
			if (a % 3 === 0)
				item.text(this.priceLegend[a]);
		}
	};
	_.positionItems = function() {
		var h = Math.floor((this.style.height() - (this.vLinePadding +this.hPaddingBottom)) / (this.priceLegend.length - 1));
		var w = Math.floor((this.style.width() - (this.linePaddingLeft + this.hLinePadding + 10)) / this.data.stock.length);
		for (var a = 0; a < this.children.length; a++) {
			var item = this.children[a];
			if ( item instanceof VItem) {
				item.style.y((item.index * h) + this.vLinePadding);
				item.style.x(this.linePaddingLeft);
				item.position();

			}else if ( item instanceof HItem) {
				item.style.y(this.style.height() - this.hPaddingBottom);
				item.style.x((item.index * w) + (this.linePaddingLeft + 10));
				item.position();

			}
		}
	};
	_.lowestAndHighest = function() {
		this.priceLegend = [];
		for (var a = 0; a < this.data.stock.length; a++) {
			var price = this.data.stock[a].Low;
			this.priceLegend.push(price);
		}
		this.priceLegend.sort(function(a, b) {
			return b - a;
		});
	};
	_.resize = function() {

		var h = this.style.height() - this.hPaddingBottom;
		this.hLine.moveTo(this.linePaddingLeft, h);
		this.hLine.lineTo(this.style.width() - (this.hLinePadding + this.linePaddingLeft), h);

		this.vLine.moveTo(this.linePaddingLeft, this.style.height() - this.hPaddingBottom);
		this.vLine.lineTo(this.linePaddingLeft, this.vLinePadding);

		this.label.style.x(-10);
		this.label.style.y((h - this.label.style.width()) * 0.5);
		if(this.data && this.data.stock)this.positionItems();
	};
})();
