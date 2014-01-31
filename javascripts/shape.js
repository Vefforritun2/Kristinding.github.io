var Shape = Base.extend({
	constructor: function(startX, startY, color){
		this.startX = startX;
		this.startY = startY;
		this.color = color;
	}
});

//Instance of line
var Line = Shape.extend({
	constructor: function(startX, startY, color){
		this.base(startX, startY, color);
	},
	draw: function(context) {
		context.beginPath();
		context.moveTo(this.startX, this.startY);
		context.lineTo(this.endX, this.endY);
		context.stroke();
	}
});

//Instance of rectangle
var Rect = Shape.extend({
	constructor: function(startX, startY, color){
		this.base(startX, startY, color);
		
	},
	draw: function(context) {
		context.strokeStyle = this.color;
		context.strokeRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
	}
});

//instance of circle
var Circle = Shape.extend({
	constructor: function(startX, startY, color){
		this.base(startX, startY, color)
	},
	draw: function(context) {
		context.strokeStyle = this.color;
		context.beginPath( );
		context.arc( this.startX, this.startY, Math.sqrt( Math.pow(this.endY-this.startY, 2) + Math.pow(this.endX-this.startX, 2) ), this.startX, this.endX * Math.PI, false );
		context.stroke( );
	}
});

//instance of text
var Text = Shape.extend({
	constructor: function(startX, startY, color, font){
		this.base(startX, startY, color);
		this.font = font;
	},
	draw: function(context) {
		console.fillStyle= this.color;
		context.fillText(this.text, this.startX, this.startY);
		//context.measureText();
	}
});

//instance of pen
var Pen = Shape.extend({
	constructor: function(startX, startY, color){
		this.base(startX, startY, color);
		//var arrayOfGrids = [];
		this.Point = [];
	},
	setEndPoint: function( pt ){
		console.log("push");
		this.points.push(pt);                         //   ---   eitthvað að klikka
	},
	draw: function(context) {

		context.beginPath();
		context.moveTo(this.startX, this.startY);
		context.lineTo(this.endX, this.endY);
		context.stroke();
	}
});
