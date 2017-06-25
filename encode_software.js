var encrypt = null;
var userinput = "";
var result = "";
 
function validateInput(inputField, displayField) {
    var re = /[a-z]+/;
    if (re.test(inputField.value)) {
        displayField.innerHTML = inputField.value;
    }
    else {
        displayField.innerHTML = "Wrong!!";
    }
}
 
function display(choice) {
    var message;
	var inputField = document.getElementById('input'); 
    var displayField = document.getElementById('display');
    switch (choice) {
        case "new":
            encrypt = new Encrypt();
            message = "code: " + encrypt.showCode();
			//message = encrypt.showCode();
            break;
                 
        case "save":
            if (encrypt == null) {
                message = "No Encrypt object can save!!";
            }
            else {
                document.cookie = "code=" + encrypt.showCode();
                message = "The code is saved.";
            }
            break;
 
        case "load":
            var t = document.cookie;
            if (t == "") {
                message = "Load denied!!";
            }
            else {
                encrypt = new Encrypt();
				//  var _new = _href.substring(0, _href.lastIndexOf('page=') + 5) + _newCount;
                //t = t.substring(5);
				t = t.substring(t.lastIndexOf('code=') + 5, t.length);
                encrypt.setCode(t)
                message = "code: " + encrypt.showCode();
            }
            break;
                 
        case "encode":
            userinput = inputField.value;
             
            if (userinput == "") {
                message = "No input string!!";
            }
            else {
                if (encrypt == null) {
                    message = "No encrypt object!!";
                }
                else {
                    result = encrypt.toEncode(userinput);
                    message = "encoded result: " + result;
                }
            }
            break;
     
        case "decode":
            userinput = inputField.value;
             
            if (userinput == "") {
                message = "No input string!!";
            }
            else {
                if (encrypt == null) {
                    message = "No encrypt object!!";
                }
                else {
                    result = encrypt.toDecode(userinput);
                    message = "decoded result: " + result;
                }
            }
            break;
 
        case "clear":
            inputField.value = "";
            encrypt = null;
            userinput = "";
            result = "";
            message = "It's done.";            
            break;
                 
        default:
            message = "Wrong choice!!";
    }
     
    displayField.innerHTML = message;
}