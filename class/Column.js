class RowSet{
	
	constructor(tblId){
		this.tblId = tblId;
		this.list = [];
	}
	
	add(type,position = null){
		/*
		if(position != null){
			this.list=this.list((l,el,index) => {
				if(index == position)
					l.push(new Row(Math.floor(Math.random()*100000),type));
				l.push(el);
				return l;
			},[]);
		}
		*/
		
		this.list.push(new Row(Math.floor(Math.random()*10000000),type));
		this.render();
	}
	
	render(){
		console.log(this.list);
		var tbl = document.getElementById(this.tblId);
		
		tbl.innerHTML = this.list.reduce((t,row) => {
			return t += row.generate();
		},"");
		tbl.lastChild.lastChild.lastChild.innerHTML += "<button onclick=\"addRow();\">+</button>";
		
		var allTd = document.getElementsByClassName("attributeType");
		for(var i=0,l=allTd.length-1; i<l; i++){
			console.log("DDD");
			allTd.item(i).firstChild.onchange = (event) => {
				console.log(event.originalTarget);
			};
		}
		
	}
}

class Row{
	constructor(id, type){
		this.id = id;
		this.column = {
			"Int" : new Int(this.id,''),
			"Float" : new Float(this.id,''),
			"String" : new String(this.id,''),
			"Date" : new Date(this.id,''),
			"Null" :  new Column(this.id,'')
		}[type];
	}
	
	generate(){
		return "<tr class=\"attributeInfo\">"
			+ "<td class=\"attributeName\">"
			+ "<input id=\"attributeName" + this.id + "\" type=\"text\" value=\"" + this.column.name + "\" /></td>"
			+ "<td class=\"attributeType\"><select id=\"attributeType" + this.id + "\">"
			+ "<option value=\"int\">Int</option>"
			+ "<option value=\"float\">Float</option>"
			+ "<option value=\"string\">String</option>"
			+ "<option value=\"date\">Date</option>"
			+ "<option value=\"null\">Null</option>"
			+ "</select></td><td class=\"attributeRange\">" + this.column.range() + "</td>"
			+ "<td class=\"attributeOption\"><button onclick=\"removeRow(" + this.id + ");\">-</button></td></tr>";
	}
}

class Column{
	
	constructor(id,nome,setNull = false){
		this.id = id;
		this.nome = nome;
		this.nullPercentage = 5;
		this.setNull = setNull;
		this.type = "Null";
		this.value = "null";
		this.decimalNumber = 2;
	}

	range(){return "NULL";}
	
	generate(){
		return this.setNull && (this.randomInt(0,100) < this.nullPercentage) ? 
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
		this.type = "Int";
	}
	
	range(){
	return "<label>Min:</label><input class='short' id='rMin" + this.id + "' tipe='number'/>"
		+"<label>Max:</label><input class='short' id='rMax" + this.id + "' tipe='number'/>";
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
		this.type = "Float";
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
		this.type = "String";
		this.customCharset = {
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
			]
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
		this.type = "Date";
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