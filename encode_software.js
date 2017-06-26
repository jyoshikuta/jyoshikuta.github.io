var encrypt = null;
var userinput = "";
var result = "";
 
function validateInput(inputField, displayField) {
    /*var re = /[a-z]+/;
    if (re.test(inputField.value)) {*/
        //displayField.value = inputField.value;
		display('encode');
    /*}
    else {
        displayField.innerHTML = "Wrong!!";
    }*/
}
 
function display(choice) {
    var message;
    var message0;
	var inputField = document.getElementById('input'); 
	var displayField0 = document.getElementById('display00');
    var displayField = document.getElementById('display1');
    switch (choice) {
        case "new":
			displayField = document.getElementById('display0');
            encrypt = new Encrypt();
			message = encrypt.showCode();
            //message = "code: " +"<br>" + encrypt.showCode();
			//message = encrypt.showCode();
            break;
                 
        case "save":
			displayField = document.getElementById('display0');
            if (encrypt == null) {
                message = "No Encrypt object can save!!";
            }
            else {
                //document.cookie = "code=" + encrypt.showCode();
				document.cookie = "code=" + displayField.value;
                message = "The code is saved.";
            }
            break;
 
        case "load":
			displayField = document.getElementById('display0');
            var t = document.cookie;
            if (t == "") {
                message = "Load denied!!";
            }
            else {
                encrypt = new Encrypt();
				//  var _new = _href.substring(0, _href.lastIndexOf('page=') + 5) + _newCount;
                //t = t.substring(5);
				t = t.substring(t.lastIndexOf('code=') + 5, t.lastIndexOf('code=') + 31+10);
                encrypt.setCode(t)
                message = encrypt.showCode();
            }
            break;
                 
        case "encode":
            userinput = inputField.value.toLowerCase();
             message0 = "encoded result: ";
            if (userinput == "") {
                message = "No input string!!";
            }
            else {
                if (encrypt == null) {
                    message = "No encrypt object!!";
                }
                else {
                    result = encrypt.toEncode(userinput);
                    message = result;
                }
            }
            break;
     
        case "decode":
            userinput = inputField.value.toLowerCase();
             message0 = "decoded result:";
            if (userinput == "") {
                message = "No input string!!";
            }
            else {
                if (encrypt == null) {
                    message = "No encrypt object!!";
                }
                else {
                    result = encrypt.toDecode(userinput);
                    message = result;
                }
            }
            break;
 
        case "clear":
			displayField = document.getElementById('display0');
            inputField.value = "";
            encrypt = null;
            userinput = "";
            result = "";
            message = "It's done.";            
            break;
			
        case "up":
            document.getElementById("input").value = document.getElementById("input2").value;     
            display('encode');
			break;
			
        case "up_UTF8":
            document.getElementById("input2").value = document.getElementById("UTF8").value;    
			document.getElementById("input").value = document.getElementById("UTF8").value;     
            display('encode');
			break;
			
        default:
			displayField = document.getElementById('display0');
            message = "Wrong choice!!";
    }
    displayField0.innerHTML = message0;
    displayField.value = message.toUpperCase();
}