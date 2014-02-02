//create new line
function createLine(startX,startY){
	return new Line(startX, startY, Whiteboard.currentColor, Whiteboard.currentLineSize);
}
//create new Rectangle
function createRect(startX, startY) {
	return new Rect(startX, startY, Whiteboard.currentColor, Whiteboard.currentLineSize);
}
//ceate new Circle
function createCircle(startX, startY) {
	return new Circle(startX, startY, Whiteboard.currentColor, Whiteboard.currentLineSize);
}
//create new text
function createText(startX, startY) {
	return new Text(startX, startY, Whiteboard.currentColor, Whiteboard.currentFontName, Whiteboard.currentFontSize); 
}
//create new Pen
function createPen(startX, startY) {
	return new Pen(startX, startY, Whiteboard.currentColor, Whiteboard.currentLineSize);
}
//create point
function Point(startX, startY){
	this.startX = startX;
	this.startY = startY;
}
function createImage(context){
	return new uplodedImage(context);
}
//draw on the board 
var Whiteboard = {
	currentColor: "Black",  
	currentFontName: "Courier New",
	currentLineSize: 4,
	currentFontSize: "12",
	//array of all the shapes
	shape: [], 
	redo: [],
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
	var nextShape = eval("createPen");
	var currentShape;
	var factory = "createPen";
	var textString;
	var HEIGHT = canvas.height;
	var WIDTH = canvas.width;
	var selectedClicked = false;
	var isDrag = false;
	var mySel;
	var offsetx, offsety;
	var lastColor;
  	if (mySel != null) {
      context.strokeStyle = mySelColor;
      context.lineWidth = mySelWidth;
      context.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    function selectShape(startX, startY, context, shape)
	{
		if(Whiteboard.shape.length > 0)
		{
			//this.startX = startX;
			//this.startY = startY;
			console.log(Whiteboard.shape.length);
			var ghostcanvas = document.createElement("canvas");
			var gctx = ghostcanvas.getContext("2d");
			//var offsetx, offsety;
		  	ghostcanvas.height = myCanvas.height;
		  	ghostcanvas.width = myCanvas.width;
			for (var i = 0 ; i < Whiteboard.shape.length ; i++ )
				{
					shape[i].draw(gctx);
					var imageData = gctx.getImageData(startX, startY, 1, 1);
					gctx.clearRect(0, 0, 700, 410);	
					if(imageData.data[3]>0)
					{
						lastColor = shape[i].color;
						shape[i].color = "magenta";
						
						context.clearRect(0, 0, 700, 410);	
						Whiteboard.redraw(context);
						return shape[i];
					}	
				}
		}	
	}
	//Clear the board
	$("#btn8").click(function(e){
		context.clearRect(0, 0, 700, 410);
		Whiteboard.shape.length = 0;
		Whiteboard.redo.length = 0;
		Whiteboard.redraw(context);
		factory = "createPen";                    
		nextShape = eval(factory);
		Whiteboard.currentColor = "black";
	});
	//undo
	$("#btn6").click(function(e){
		if( Whiteboard.shape.length !== 0 )
		{
			context.clearRect(0, 0, 700, 410);
			Whiteboard.redo.push(Whiteboard.shape[Whiteboard.shape.length - 1]);
			Whiteboard.shape.pop(Whiteboard.shape[Whiteboard.shape.length - 1]);
			Whiteboard.redraw(context);
		}	
	});
	//redo
	$("#btn7").click(function(e){
		if( Whiteboard.redo.length !== 0 )
		{
			Whiteboard.shape.push(Whiteboard.redo[Whiteboard.redo.length - 1]);
			Whiteboard.redo.pop(Whiteboard.redo[Whiteboard.redo.length - 1]);
			Whiteboard.redraw(context);
		}
	});
	//select
	$("#btn9").click(function(e){
		selectedClicked = true;
	});
	$(".btnShape").click(function(e){
		selectedClicked = false;
	});
	//download drawing
	//Heimild http://www.nihilogic.dk/labs/canvas2image/
	$("#dlbtn").click(function(e)
	{
		var oCanvas = document.getElementById("myCanvas");  
		Canvas2Image.saveAsPNG(oCanvas);   
	  
	});
	//upload drawing
	$("#imageLoader").on('change', function(e)
	{
		var newUploadedImage = createImage(context);
		newUploadedImage.draw(context);
		Whiteboard.shape.push(newUploadedImage);  
	});
	//change color
	$("#colour").click(function(e){
		Whiteboard.currentColor = $("#colour :selected").val();
	})
	//change font size
	$("#fontSize").click(function(e) {
		Whiteboard.currentFontSize = $("#fontSize :selected").val();
	});
	//change font name
	$("#font").click(function(e){
		Whiteboard.currentFontName = $("#font :selected").val();
	});
	//change line size
	$("#lineSize").click(function(e){
		Whiteboard.currentLineSize = $("#lineSize :selected").val();
	});
	//submits text
	$("#textSubmit").click(function(e){
		textString = $("#textBox").val();
		$("#textBox").val('');
		$("#writeText").hide();
		if(textString)
		{
			currentShape.text=textString;
			//adding the new shape to the Whiteboard
			Whiteboard.shape.push(currentShape);
			//drawing all the shapes
			Whiteboard.redraw(context);	
		}
		var backX = -e.pageX + 170;                                 //     -- útfæra betur
		var backY = -e.pageY + 7;  	                                //     -- útfæra betur
		$("#writeText").offset({ top: backY, left:  backX});	
	});
	//Event handler for clicking a shape
	$(".btnShape").click(function(e){
		factory = $(this).attr("data-shape");
		//we need to change/evaluate the factory string to function
		nextShape = eval(factory);
	});
	//drawing or moving shape 
	$("#myCanvas").mousedown(function(e){
		//gives us the x and y coordinate where the mouse is pressed down
		console.log("wh le" + Whiteboard.shape.length);
		startX = e.pageX - this.offsetLeft;
		startY = e.pageY - this.offsetTop;
		if(selectedClicked)
		{
			$("#myCanvas").css('cursor', 'move');
			mySel = selectShape(startX, startY, context, Whiteboard.shape);
			if( mySel )
			{
				offsetx = e.pageX - mySel.startX;
	      		offsety = e.pageY - mySel.startY;
	      		offsetxend = e.pageX - mySel.endX;
	      		offsetyend = e.pageY - mySel.endY;
	      		isDrag = true;
	      	}
		}	
		else
		{
			isDrawing = true;
			currentShape = nextShape(startX, startY);
			if(factory === "createText")
			{
				$("#writeText").offset({ top: e.pageY, left: e.pageX});
				$("#writeText").show();
			}
		}	
	});
	$("#myCanvas").mousemove(function(e) {
		if( isDrawing === true ){
				currentShape.endX = e.pageX - this.offsetLeft;
				currentShape.endY = e.pageY - this.offsetTop;
			if( ( factory !== "createText" ) && ( factory !== "createPen" ) ){
				context.clearRect(0, 0, 700, 410);	
				//drawing all the shapes
				Whiteboard.redraw(context);	
				//drawing the current shape
				currentShape.draw(context);
			}	
			else if( ( factory === "createPen" ) )
			{
				var s = new Point(currentShape.endX, currentShape.endY);
				currentShape.setEndPoint(s);                          
				Whiteboard.redraw(context);	
				currentShape.draw(context);
			}
		}
		else if (selectedClicked && isDrag)
		{
			mySel.startX = e.pageX - offsetx;
      		mySel.startY = e.pageY - offsety;
      		mySel.endX = e.pageX - offsetxend;
			mySel.endY = e.pageY - offsetyend;
			console.log("endX" + mySel.endX);
			context.clearRect(0, 0, 700, 410);	
			Whiteboard.redraw(context);
		}
	});
	$("#myCanvas").mouseup(function(e) {
		if(selectedClicked && mySel)
		{
			$("#myCanvas").css('cursor', 'crosshair');
			mySel.color = lastColor;
			context.clearRect(0, 0, 700, 410);	
			Whiteboard.redraw(context);
			mySel = null;
			isDrag = false;
			//selectedClicked = false;
		}	
		isDrawing = false;
		if( ( factory !== "createText" ))
		{
			//adding the new shape to the Whiteboard
			Whiteboard.shape.push(currentShape);
		}	
	});
	//moving shape
	$("#btn9").mousedown(function(e){
		
		if ( Shape.contains ){
		}
	});
});