var Shape = Base.extend({
	constructor: function(x, y, color){
		this.x = x;
		this.y = y;
		this.color = color;
	}
});


//Instance af kassa
var Rect = Shape.extend({
	constructor: function(x, y, color, lineColor, endX, endY){

		this.base(x,y,color);
		//kannski getum við sagt að endX er = x í upphafi en svo ætlum við að breyta því eftir því sem sem notandinn færir til músina með hann teiknar
		this.endX = endX;
		this.endX = endY;
		//o.s.frv....
	},
	draw: function (context) {
		//erum að gera ráð fyrir því að við erum að fara að gera filltan kassa
		context.fillStyle = this.color;

		//gæti verið að við verðum að útfæra this.endX - this.x eitthvað betur þar sem að við gætum fengið mínus..
		context.fillRect(this.x, this.y, this.endX - this.x, this.endY - this.y)
		//getum svo bætt við fleiri föllum inn hér ....
	}

});