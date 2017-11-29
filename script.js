/*
btnNext1.onclick = () => {
	var fase1 = document.getElementById("fase1");
	var tableName = document.getElementById("tableName").value;
	var Ncolumn = document.getElementById("Ncolumn").value;
	
	fase1.innerHTML += makeTbl();
	
	var out = "<table border=1><tr class='center'><td>Column Name</td><td>Type</td></tr>";
	for(var i = 0;i<Ncolumn;i++){
		out += stringifyTipe(i);
	}
	out += "</table>";
	out += "<button id='next2' onClick='checkRange();'>next2</button><br/>";
	fase1.innerHTML = out;
}
*/
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