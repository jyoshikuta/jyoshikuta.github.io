
var isgo = 0;
var mode = 0;
var messagetemp = 0;
var message2 = 0;

function ST() {
	if (mode == 0) {
		isgo++;
		if (isgo == 11) {
			isgo = 1;}
		var displayField = document.getElementById('display');
		displayField.innerHTML = isgo;
		setTimeout("ST()",1500);}
	}
function NR() {
	if (mode == 1) {
		RD();
		setTimeout("NR()",2500);}	
	}
function RD() {
	mode = 1;
	var displayField = document.getElementById('display');
	message2 = Math.floor((Math.random() * 10) + 1);
	RDtest();
	messagetemp = message2;
	displayField.innerHTML = message2;
	}
function RDtest() {
	if (message2 == messagetemp) {RD();}
	}
function display(choice) {
    mode = 0;
	var message=choice;
	var displayField = document.getElementById('display');
    displayField.innerHTML = message;
}
