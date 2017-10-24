var nullPercentage=5;
var decimalNumber=2;

var charName=[
	"David",
	"Marco",
	"Giulia",
	"Giuseppe",
	"Mario",
	"Luigi",
	"Susanna"
];
var charSurname=[
	"DeAngelis",
	"Rossi",
	"Cruciani",
	"Bianchi",
	"Bellan",
	"Bragato",
	"Parenzo"
];
var charCity=[
	"Pisa",
	"Torino",
	"Milano",
	"Roma",
	"Napoli",
	"Palermo",
	"Nizza"
];
var charSigle=[
	"AL",
	"TO",
	"MI",
	"RO",
	"AO",
	"CU",
	"EB",
	"AS",
	"GE",
	"VE"
];
var charGeneral=[
	"casa",
	"cane",
	"pane",
	"luce",
	"more",
	"fratello",
	"sorella",
	"muro",
	"stereo",
	"usb"
];
var charsetA="qazxswedcvfrtgbnhyujmkiolp";
var charset0="0123456789";

var tableName;
var colName=new Array();
var colType=new Array();
var Ncolumn;

var allCharset=new Array();
var allMin=new Array();
var allMax=new Array();
var allNull=new Array();

//---------------------------------------------------------

function checkNames(){
	var fase1=document.getElementById("fase1");
	tableName=document.getElementById("tableName").value;
	Ncolumn=document.getElementById("Ncolumn").value;
	var out="<hr/><table border=1><tr class='center'><td>Column Name</td><td>Type</td></tr>";
	for(var i=0;i<Ncolumn;i++){
		out+=stringifyTipe(i);
	}
	out+="</table>";
	out+="<button id='next2' onClick='checkRange();'>next2</button><br/>";
	fase1.innerHTML=out;
}

function checkRange(){
	var fase2=document.getElementById("fase2");
	var out="<hr><table border=1><tr class='center'><td>Column Name</td><td>Type</td><td>Range</td><td>addNull</td></tr>";
	for(var i=0;i<Ncolumn;i++){
		var nome=document.getElementById("nome"+i).value;
		var Type=document.getElementById("Type"+i).value;
		out+="<tr><td>"+nome+"</td><td>"+Type+"</td>";
		switch(Type){
			case"int":
				out+="<td>"+doubleRange(i)+"</td>";
			break;
			case"float":
				out+="<td>"+doubleRange(i)+"</td>";
			break;
			case"string":
				out+=stringRange(i);
			break;
			case"date":
				out+="<td>"+doubleRange(i)+"</td>";
			break;
			case"null":
				out+="<td>NULL</td>";
			break;
		}
		out+="<td><input type='checkbox' id='isNull"+i+"' value='true'>Null</td></tr>";
		colName.push(nome);
		colType.push(Type);
	}
	out+="<table>";
	out+="N. valori:<input type='text' class='short' id='nVal' /><button id='next3' onClick='createT();'>createT</button><br/>";
	fase2.innerHTML=out;
}

function createT(){

	var nVal=document.getElementById("nVal").value;
	var fase3=document.getElementById("fase3");
	
	allCharset=new Array();
	allMin=new Array();
	allMax=new Array();
	allNull=new Array();
	
	for(var i=0;i<Ncolumn;i++){
		allMin.push(document.getElementById("rMin"+i) != null ? parseInt(document.getElementById("rMin"+i).value) : 0);
		allMax.push(document.getElementById("rMax"+i) != null ? parseInt(document.getElementById("rMax"+i).value) : 50);
		allCharset.push(document.getElementById("charset"+i) != null ? document.getElementById("charset"+i).value : 'X');
		allNull.push(document.getElementById("isNull"+i) != null ? document.getElementById("isNull"+i).checked : false);
	}
	var out="";
	for(var i=0;i<nVal;i++){
		out+="INSERT INTO "+tableName+"("+stringifyCol()+") VALUES(";
		for(var j=0;j<Ncolumn;j++){
		//console.log(j+") "+allMin[j]+" - "+allMax[j]);
			switch(colType[j]){
				case"int":
					out+=(allNull[j]) ? (rangedomInt(0,100)<nullPercentage ? "null, " : randomInt(j)+", ") : (randomInt(j)+", ");
				break;
				case"float":
					out+=(allNull[j]) ? (rangedomInt(0,100)<nullPercentage ? "null, " : randomFloat(j).toFixed(decimalNumber)+", ") : (randomFloat(j).toFixed(decimalNumber)+", ");
				break;
				case"string":
					out+=(allNull[j]) ? (rangedomInt(0,100)<nullPercentage ? "null, " : "'"+randomString(j)+"', ") : ("'"+randomString(j)+"', ");
				break;
				case"date":
					out+=(allNull[j]) ? (rangedomInt(0,100)<nullPercentage ? "null, " : "'"+randomDate(j)+"', ") : ("'"+randomDate(j)+"', ");
				break;
				case"null":
					out+="null, ";
				break;
			}
		}
		out=out.substr(0,out.length-2);
		out+=");<br/>\n";
	}
	fase3.innerHTML=out;
}
function randomString(n){
	var out="";
	if(isCharset(n)){
		var l=randomInt(n);
		var charset="";
		if(allCharset[n].indexOf('c')>-1)charset+=charsetA;
		if(allCharset[n].indexOf('C')>-1)charset+=charsetA.toUpperCase();
		if(allCharset[n].indexOf('n')>-1)charset+=charset0;
		for(var i=0;i<l;i++){
			out+=charset[rangedomInt(0,charset.length-1)];
		}
	}else{
		switch(allCharset[n]){
			case'nomi':
				out+=charName[rangedomInt(0,charName.length-1)];
			break;
			case'cognomi':
				out+=charSurname[rangedomInt(0,charSurname.length-1)];
			break;
			case'citta':
				out+=charCity[rangedomInt(0,charCity.length-1)];
			break;
			case'province':
				out+=charSigle[rangedomInt(0,charSigle.length-1)];
			break;
			case'parole':
				out+=charGeneral[rangedomInt(0,charGeneral.length-1)];
			break;
		}
	}
	return out;
}
function isCharset(n){
	if(allCharset[n]=='c'||allCharset[n]=='C'||allCharset[n]=='n'||allCharset[n]=='cn'||allCharset[n]=='Cn'||allCharset[n]=='cCn')
		return true;
	return false;
}
function randomDate(n){
	return randomInt(n)+"/"+rangedomInt(1,12)+"/"+rangedomInt(1,28);
}
function randomFloat(n){
	return rangedom(allMin[n],allMax[n]);
}
function randomInt(n){
	return Math.floor(randomFloat(n));
}
function stringifyCol(){
	var out="";
	for(var i=0;i<Ncolumn;i++){
		out+=colName[i]+", ";
	}
	return out.substr(0,out.length-2);
}
function rangedomInt(a,b){
	return Math.floor(rangedom(a,b));
}
function rangedom(a,b){
	return Math.random()*(b-a)+a;
}
function stringRange(n){
	return "<td>"
		+doubleRange(n)
		+"charset<select id='charset"+n+"'>"
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
function doubleRange(n){
	return ""
		+"Min<input class='short' id='rMin"+n+"' tipe='number'/>"
		+"Max<input class='short' id='rMax"+n+"' tipe='number'/>";
}
function stringifyTipe(n){
	return	"<tr><td><input id='nome"+n+"' type='text' /></td><td>"
		+"<select id='Type"+n+"'>"
		+"<option value='int'>Int</option>"
		+"<option value='float'>Float</option>"
		+"<option value='string'>String</option>"
		+"<option value='date'>Date</option>"
		+"<option value='null'>Null</option>"
		+"</select></td></tr>";
}