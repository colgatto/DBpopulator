class Column{
	
	constructor(id,nome,setNull = false){
		this.id = id;
		this.nome = nome;
		this.nullPercentage = 5;
		this.setNull = setNull;
		this.value = "null";
		this.decimalNumber = 2;
	}

	range(){return "NULL";}
	
	generate(){
		return this.setNull && this.randomInt(0,100) < this.nullPercentage) ? 
			"null" : "" + this.value;
	}
	
	randomFloat(a = this.min, b = this.max){
		return Math.random() * (b - a) + a;
	}
	
	randomInt(a = this.min, b = this.max){
		return Math.floor(this.randomFloat(a,b));
	}
}

/*
	INT
*/
class Int extends Column{
	
	constructor(id,nome,setNull = false){
		super(id,nome,setNull);
	}
	
	range(){
	return "Min<input class='short' id='rMin" + this.id + "' tipe='number'/>"
		+"Max<input class='short' id='rMax" + this.id + "' tipe='number'/>";
	}
	
	setMin(value){
		this.min = value;
	}
	
	setMax(value){
		this.max = value;
	}
	
	setValue(){
		this.value = this.randomInt();
	}
}
/*
	FLOAT
*/
class Float extends Column{
	
	constructor(id,nome){
		super(id,nome);
	}
	
	range(){
	return "Min<input class='short' id='rMin" + this.id + "' tipe='number'/>"
		+"Max<input class='short' id='rMax" + this.id + "' tipe='number'/>";
	}
	
	setMin(value){
		this.min = value;
	}
	setMax(value){
		this.max = value;
	}
	setValue(){
		this.value = this.randomFloat().toFixed(this.decimalNumber);
	}
}
/*
	STRING
*/
class String extends Column{
	
	constructor(id,nome){
		super(id,nome);
		this.customCharset={
			'charName' : [
				'David',
				'Marco',
				'Giulia',
				'Giuseppe',
				'Mario',
				'Luigi',
				'Susanna'
			],
			'charSurname' : [
				'DeAngelis',
				'Rossi',
				'Cruciani',
				'Bianchi',
				'Bellan',
				'Bragato',
				'Parenzo'
			],
			'charCity' : [
				'Pisa',
				'Torino',
				'Milano',
				'Roma',
				'Napoli',
				'Palermo',
				'Nizza'
			],
			'charSigle' : [
				'AL',
				'TO',
				'MI',
				'RO',
				'AO',
				'CU',
				'EB',
				'AS',
				'GE',
				'VE'
			],
			'charGeneral' : [
				'casa',
				'cane',
				'pane',
				'luce',
				'more',
				'fratello',
				'sorella',
				'muro',
				'stereo',
				'usb'
			];
		}
	}
	
	range(){
	return "Min<input class='short' id='rMin" + this.id + "' tipe='number'/>"
		+"Max<input class='short' id='rMax" + this.id + "' tipe='number'/>"
		+"charset<select id='charset" + this.id + "'>"
		+"<option value='c'>a-z</option>"
		+"<option value='C'>A-Z</option>"
		+"<option value='n'>0-9</option>"
		+"<option value='cn'>a-z0-9</option>"
		+"<option value='Cn'>A-Z0-9</option>"
		+"<option value='cCn'>a-zA-Z0-9</option>"
		+"<option value='nomi'>Nomi</option>"
		+"<option value='cognomi'>Cognomi</option>"
		+"<option value='citta'>Citta</option>"
		+"<option value='province'>Province</option>"
		+"<option value='parole'>Parole</option>"
		+"</select></td>";
	}
	
	setMin(value = 0){
		this.min = value;
	}
	
	setMax(value = this.charset.length-1){
		this.max = value;
	}
	
	setCharset(value){
		let set={
			'a' : "qazxswedcvfrtgbnhyujmkiolp",
			'A' : "QAZXSWEDCVFRTGBNHYUJMKIOLP",
			'0' : "0123456789"
		}
		this.useCustomCharset = false;
		this.charset = set.reduce(function(ret,s){
			return ret += value.indexOf(s)>-1 ? set[s] : "";
		},"");
	}
	
	setCustomCharset(value){
		this.useCustomCharset = true;
		this.charset = this.customCharset[value];
		setMin();
		setMax();
	}
	
	setValue(){
		this.value = this.useCustomCharset ? 
			this.charset[this.randomInt()] :
			this.makeString();
	}
	
	makeString(){
		let out = "";
		for(var i=0,l=this.randomInt();i<l;i++){
			out+=realCharset[this.randomInt(0,this.charset.length-1)];
		}
		return out;
	}
}

/*
	DATE
*/
class Date extends Column{
	
	constructor(id,nome){
		super(id,nome);
	}
	
	range(){
	return "Min<input class='short' id='rMin" + this.id + "' tipe='number'/>"
		+"Max<input class='short' id='rMax" + this.id + "' tipe='number'/>";
	}
	
	setMin(value){
		this.min = value;
	}
	
	setMax(value){
		this.max = value;
	}
}