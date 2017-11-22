class Charset{
	
	constructor(){
		this.hit = 0;
		this.resistance = 999999999;
	}

		var charset="";
		if(allCharset[n].indexOf('c')>-1)charset+=charsetA;
		if(allCharset[n].indexOf('C')>-1)charset+=charsetA.toUpperCase();
		if(allCharset[n].indexOf('n')>-1)charset+=charset0;

	
		for(var i=0,l=randomInt(n);i<l;i++){
			out+=charset[rangedomInt(0,charset.length-1)];
		}
		
		
	makeContent(){}

	sum(value){
		this.size+=value;
		return value;
	}
	
	show(){
		fill(this.color);
		rect(this.x*scl, this.y*scl, scl, scl);
	}

}
class Water extends Block{
	
	constructor(noise,x,y){
		super(noise,x,y);
		
		this.makeContent();
	}
	makeContent(){
		this.content.water = this.sum(Math.floor(random(180,210)-this.noise));
	}
}