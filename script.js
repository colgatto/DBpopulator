var fase1=document.getElementById("fase1");
tableName=document.getElementById("tableName").value;
Ncolumn=document.getElementById("Ncolumn").value;
var out="<table border=1><tr class='center'><td>Column Name</td><td>Type</td></tr>";
for(var i=0;i<Ncolumn;i++){
	out+=stringifyTipe(i);
}
out+="</table>";
out+="<button id='next2' onClick='checkRange();'>next2</button><br/>";
fase1.innerHTML=out;
