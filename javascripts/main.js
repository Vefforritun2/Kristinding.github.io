//create new Rectangle
function createRect(x,y) {
	//return new Rect(x,y,...);
}
//create new line
function createLine(startX,startY, endX, endY){
	return new Line(startX, startY, endX, endY, Whiteboard.currentColor);
}
//draw on the board
var Whiteboard = {
	currentColor: "Black",  
	currentFontName: "Courier New",
	//currentFontSize: ....
	//array of all the shapes
	shape: [], 
	//draw all the shapes
	redraw: function(context){
		for (var i = 0 ; i < this.shape.length ; i++ )
		{
			this.shape[i].draw(context);
			console.log(this.shape[i]);
		}
	}
};
$(document).ready(function(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var startX = 0;
	var startY = 0;
	var endX = 0;
	var endY = 0;
	var isDrawing = false;
	var nextShape = "Pen";
	//Event handler for clicking a shape
	$(".btnShape").click(function(e){
		var factory = $(this).attr("data-shape");
		//we need to change the factory string to function
		nextShape = eval(factory);
	});
	$("#myCanvas").mousedown(function(e){
		//gives us the x and y coordinate where the mouse is pressed down
		startX = e.pageX - this.offsetLeft;
		startY = e.pageY - this.offsetTop;
		isDrawing = true;
	});
	$("#myCanvas").mousemove(function(e) {
		if( isDrawing === true ){
			endX = e.pageX - this.offsetLeft;
			endY = e.pageY - this.offsetTop;
			context.clearRect(0, 0, 500, 500);	
			context.beginPath();
			context.moveTo(startX, startY);
			context.lineTo(endX, endY);
			context.stroke();
				
		Whiteboard.redraw(context);						
		}
	});
	$("#myCanvas").mouseup(function(e) {
		isDrawing = false;
		//create the next shape
		var shape = nextShape(startX, startY, endX, endY);
		//adding the new shape to the Whiteboard
		Whiteboard.shape.push(shape);

	});
});
