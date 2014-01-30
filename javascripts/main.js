//create new Rectangle
function createRect(x,y) {
	//return new Rect(x,y,...);
}

//create new line
function createLine(x,y){
	return new Line(x,y, Whiteboard.currentColor);
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
		}
	}
};

$(document).ready(function(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	alert("hello");
	var startX = 0;
	var startY = 0;
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
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		//create the next shape
		var shape = nextShape(x,y);
		console.log(shape);
		//adding the new shape to the Whiteboard
		Whiteboard.shape.push(shape);

		startX = x;
		startY = y;

		isDrawing = true;
	});

	$("#myCanvas").mousemove(function(e) {

		if( isDrawing === true ){
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;

			context.clearRect(0, 0, 500, 500);

			context.beginPath();
			context.moveTo(startX, startY);
			context.lineTo(x,y);
			context.stroke();
		}
	});

	$("#myCanvas").mouseup(function(e) {
		isDrawing = false;
	});
});