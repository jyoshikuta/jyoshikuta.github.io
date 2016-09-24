var CPstring = '';

function dec2hex ( textString ) {
 return (textString+0).toString(16).toUpperCase();
}

function  dec2hex2 ( textString ) {
  var hexequiv = new Array ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
  return hexequiv[(textString >> 4) & 0xF] + hexequiv[textString & 0xF];
}



function getCPfromChar ( textString ) {
	// converts a character or sequence of characters to hex codepoint values
	// copes with supplementary characters
	// returned values include a space between each hex value and at the end
	var codepoint = "";
	var haut = 0;
	var n = 0; 
	for (var i = 0; i < textString.length; i++) {
		var b = textString.charCodeAt(i); 
		if (b < 0 || b > 0xFFFF) {
			codepoint += 'Error: Initial byte out of range in getCPfromChar: '+dec2hex(b);
			}
		if (haut != 0) { // we should be dealing with the second part of a supplementary character
			if (0xDC00 <= b && b <= 0xDFFF) {
				codepoint += dec2hex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00)) + ' ';
				haut = 0;
				continue;
				}
			else {
				codepoint += 'Error: Second byte out of range in getCPfromChar: '+dec2hex(haut);
				haut = 0;
				}
			}
		if (0xD800 <= b && b <= 0xDBFF) { //b is the first part of a supplementary character
			haut = b;
			}
		else { // this is not a supplementary character
//			codepoint += dec2hex(b);
			codepoint += b.toString(16).toUpperCase()+' ';
			}
		} 
 //alert('>'+codepoint+'<');
	return codepoint;
	}

function convertCP2UTF8 ( textString ) {
  var outputString = "";
  textString = textString.replace(/^\s+/, '');
  if (textString.length == 0) { return ""; }
  textString = textString.replace(/\s+/g, ' ');
  var listArray = textString.split(' ');
  for ( var i = 0; i < listArray.length; i++ ) {
    var n = parseInt(listArray[i], 16);
    if (i > 0) { outputString += ' ';}
    if (n <= 0x7F) {
      outputString += dec2hex2(n);
    } else if (n <= 0x7FF) {
      outputString += dec2hex2(0xC0 | ((n>>6) & 0x1F)) + ' ' + dec2hex2(0x80 | (n & 0x3F));
    } else if (n <= 0xFFFF) {
      outputString += dec2hex2(0xE0 | ((n>>12) & 0x0F)) + ' ' + dec2hex2(0x80 | ((n>>6) & 0x3F)) + ' ' + dec2hex2(0x80 | (n & 0x3F));
    } else if (n <= 0x10FFFF) {
      outputString += dec2hex2(0xF0 | ((n>>18) & 0x07)) + ' ' + dec2hex2(0x80 | ((n>>12) & 0x3F)) + ' ' + dec2hex2(0x80 | ((n>>6) & 0x3F)) + ' ' + dec2hex2(0x80 | (n & 0x3F));
    } else {
      outputString += '!erreur ' + dec2hex(n) +'!';
    }
  }
  return( outputString );
}


function convertChar2CP ( textString ) { 
	var haut = 0;
	var n = 0;
	CPstring = '';
	for (var i = 0; i < textString.length; i++) {
		var b = textString.charCodeAt(i); 
		if (b < 0 || b > 0xFFFF) {
			CPstring += 'Error ' + dec2hex(b) + '!';
			}
		if (haut != 0) {
			if (0xDC00 <= b && b <= 0xDFFF) {
				CPstring += dec2hex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00)) + ' ';
				haut = 0;
				continue;
				}
			else {
				CPstring += '!erreur ' + dec2hex(haut) + '!';
				haut = 0;
				}
			}
		if (0xD800 <= b && b <= 0xDBFF) {
			haut = b;
			}
		else {
			CPstring += dec2hex(b) + ' ';
			}
		}
	CPstring = CPstring.substring(0, CPstring.length-1);

	UTF8.value = convertCP2UTF8( CPstring );

	}


function convertUTF82CP ( textString ) {
  var outputString = "";
  CPstring = '';
  var compte = 0;
  var n = 0;
  textString = textString.replace(/^\s+/, '');
  if (textString.length == 0) { return ""; }
  textString = textString.replace(/\s+/g, ' ');
  var listArray = textString.split(' ');
  for ( var i = 0; i < listArray.length; i++ ) {
    var b = parseInt(listArray[i], 16);  // alert('b:'+dec2hex(b));
    switch (compte) {
      case 0:
        if (0 <= b && b <= 0x7F) {  // 0xxxxxxx
          outputString += dec2hex(b) + ' ';
        } else if (0xC0 <= b && b <= 0xDF) {  // 110xxxxx
          compte = 1;
          n = b & 0x1F;
        } else if (0xE0 <= b && b <= 0xEF) {  // 1110xxxx
          compte = 2;
          n = b & 0xF;
        } else if (0xF0 <= b && b <= 0xF7) {  // 11110xxx
          compte = 3;
          n = b & 0x7;
        } else {
          outputString += '!erreur ' + dec2hex(b) + '! ';
        }
        break;
      case 1:
        if (b < 0x80 || b > 0xBF) {
          outputString += '!erreur ' + dec2hex(b) + '! ';
        }
        compte--;
        outputString += dec2hex((n << 6) | (b-0x80)) + ' ';
        n = 0;
        break;
      case 2: case 3:
        if (b < 0x80 || b > 0xBF) {
          outputString += '!erreur ' + dec2hex(b) + '! ';
        }
        n = (n << 6) | (b-0x80);
        compte--;
        break;
    }
  }
    CPstring = outputString.replace(/ $/, '');

	chars.value = convertCP2Char( CPstring );
	}


function convertCP2Char ( textString ) {
  var outputString = '';
  textString = textString.replace(/^\s+/, '');
  if (textString.length == 0) { return ""; }
  	textString = textString.replace(/\s+/g, ' ');
  var listArray = textString.split(' ');
  for ( var i = 0; i < listArray.length; i++ ) {
    var n = parseInt(listArray[i], 16);
    if (n <= 0xFFFF) {
      outputString += String.fromCharCode(n);
    } else if (n <= 0x10FFFF) {
      n -= 0x10000
      outputString += String.fromCharCode(0xD800 | (n >> 10)) + String.fromCharCode(0xDC00 | (n & 0x3FF));
    } else {
      outputString += 'convertCP2Char error: Code point out of range: '+dec2hex(n);
    }
  }
  return( outputString );
}