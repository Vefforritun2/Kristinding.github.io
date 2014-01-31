
//create new line
function createLine(startX,startY){
	return new Line(startX, startY, Whiteboard.currentColor);
}
//create new Rectangle
function createRect(startX, startY) {
	return new Rect(startX, startY, Whiteboard.currentColor);
}
//ceate new Circle
function createCircle(startX, startY) {
	return new Circle(startX, startY, Whiteboard.currentColor)
}
//draw on the board
var Whiteboard = {
	currentColor: "Black",  
	currentFontName: "Courier New",
	//context.lineWidth = 5;  þetta er línustærð, bæta þessu við ef tími gefst
	//currentFontSize: ....
	//array of all the shapes
	shape: [], 
	//draw all the shapes
	redraw: function(context){
		for (var i = 0 ; i < this.shape.length ; i++ )
		{
			this.shape[i].draw(context);
		}
	}
};
$(document).ready(function(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var startX = 0;
	var startY = 0;
	var isDrawing = false;
	var nextShape = "Pen";
	var currentShape;
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
		currentShape = nextShape(startX, startY);
	});
	$("#myCanvas").mousemove(function(e) {
		if( isDrawing === true ){
			currentShape.endX = e.pageX - this.offsetLeft;
			currentShape.endY = e.pageY - this.offsetTop;
			context.clearRect(0, 0, 500, 500);	
			currentShape.draw(context);
			Whiteboard.redraw(context);	

		}
	});
	$("#myCanvas").mouseup(function(e) {
		isDrawing = false;
		//adding the new shape to the Whiteboard
		Whiteboard.shape.push(currentShape);
		//Whiteboard.redraw(context);						
	});

});
