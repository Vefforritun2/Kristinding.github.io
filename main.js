//create new Rectangle
function createRect(x,y) {
	return new Rect(x,y,...);
}

//draw on the board
Whiteboard = {
	currentColor: "Black",  
	currentFontName: "Courier New",
	//currentFontSize: ....

	//hér kæmi svo einnig fylki af shape hlutum
	//array of all the shapes
	shape: [], 
	redraw. function(context){
		//líka hægt að fá aðgang að context hér inní og taka það ekki inn í functioninni
		//for (var i = 0 ; i < this.shape.length ; i++ )
		//{
		//	this.shape[i].draw(context);
		//}
	//}
//};


$(document).ready(function(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	var startX = 0;
	var startY = 0;
	var isDrawing = false;

	//Event handler for clickcing a button
	$(".btnShape").click(function(e){
		var factory = $(this).attr("data-shape");
		//we need to change the factory string to function
		nextShape = eval(factory);
	});


	$("#myCanvas").mousedown(function(e){


		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;

		//create the next shape
		var shape = nextShape(x,y);

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