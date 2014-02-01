var Shape = Base.extend({
	constructor: function(startX, startY, color){
		this.startX = startX;
		this.startY = startY;
		this.color = color;
	}
});

//Instance of line
var Line = Shape.extend({
	constructor: function(startX, startY, color, lineSize){
		this.base(startX, startY, color);
		this.lineSize = lineSize;
	},
	draw: function(context) {
		context.strokeStyle = this.color;
		context.lineWidth = this.lineSize;
		context.beginPath();
		context.moveTo(this.startX, this.startY);
		context.lineTo(this.endX, this.endY);
		context.stroke();
	},
	contains: function (pt){

	}
});

//Instance of rectangle
var Rect = Shape.extend({
	constructor: function(startX, startY, color, lineSize){
		this.base(startX, startY, color);
		this.lineSize = lineSize;
		
	},
	draw: function(context) {
		context.strokeStyle = this.color;
		context.lineWidth = this.lineSize;
		context.strokeRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
	}
});

//instance of circle
var Circle = Shape.extend({
	constructor: function(startX, startY, color, lineSize){
		this.base(startX, startY, color)
		this.lineSize = lineSize;
	},
	draw: function(context) {
		context.strokeStyle = this.color;
		context.lineWidth = this.lineSize;
		context.beginPath( );
		context.arc( this.startX, this.startY, Math.sqrt( Math.pow(this.endY-this.startY, 2) + Math.pow(this.endX-this.startX, 2) ), this.startX, this.endX * Math.PI, false );
		context.stroke( );
	}
});

//instance of text
var Text = Shape.extend({
	constructor: function(startX, startY, color, font, fontSize){
		this.base(startX, startY, color);
		this.font = font;
		this.fontSize = fontSize;
	},
	draw: function(context) {
		context.fillStyle = this.color;
		context.font = this.fontSize + 'px ' + this.font;
		context.fillText(this.text, this.startX, this.startY);
	}
});

//instance of pen
var Pen = Shape.extend({
	constructor: function(startX, startY, color, lineSize){
		this.base(startX, startY, color);
		this.lineSize = lineSize;
		this.point = [];
		this.arrayOfGrids = []; 
	},

	arrayOfGrids: [],

	setEndPoint: function(point){
		this.arrayOfGrids.push(point);                         //   ---   eitthvað að klikka
	},
	draw: function(context) {
		context.strokeStyle = this.color;
		context.lineWidth = this.lineSize;
		for(var i = 0; i < this.arrayOfGrids.length-1; i++) 
		{
            context.beginPath();
            context.moveTo(this.arrayOfGrids[i].startX, this.arrayOfGrids[i].startY);	
			context.lineTo(this.arrayOfGrids[i+1].startX, this.arrayOfGrids[i+1].startY);
			context.stroke();

			//context.beginPath();
			//context.arc( this.arrayOfGrids[i].startX, this.arrayOfGrids[i].startY, this.lineSize/10 , 0, 2 * Math.PI, false );
			//context.fillStyle = this.color;
			//context.fill();
			//context.stroke();

        }
	},
	contains: function (pt){
		for( var i = 0 ; i < this.arrayOfGrids.length-1 ; i++ )
		{
			if( this.arrayOfGrids === pt){
				return true;
			}
		}
	}
});

