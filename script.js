var firstNumber;
var tempStore = "";
var secondNumber;
var ret = "";
var operation;
var operations = ["*", "/", "+", "-", "SYNTAX ERROR", "undefined"];

function clickedNumber(num){
    var bool = false;
    if (operations.indexOf(ret) >= 0) {
        clearScreen();
        bool = true;
    }

    if (bool && (!(operation===("SYNTAX ERROR")))) {
        updateSecondary(firstNumber + operation);
    }

    var o = ""; 
    var ss = document.getElementById("previous-operand").innerHTML;

    for(var i = 0; i < ss.length; i++){
        var b = false;
        for(var j = 0; j < 4; j++){
            if(ss[i] === operations[j]){
                o = operations[j];
                b = true;
                break;
            }
        }
        if(bool){
            break;
        }
    }

    if(!(o === "")){
        console.log(true);
        var sp = ss.split(o);

        if(!(sp[1] === "")){
            updateSecondary("Last Ans: " + ret);
            emptyScreen(false);
        }
    }

    ret += num;
    updateScreen();
}

function clickedOperation(oper){
    if (operations.indexOf(ret) >= 0) {
        ret = "SYNTAX ERROR";
        updateScreen();
        return; 
    }else if(tempStore != ""){
        firstNumber = tempStore;
        tempStore = "";
    }
    else{
        firstNumber = ret;
    }
    if(oper == "*"){
        operation = "*";
    }else if(oper == "/"){
        operation = "/";
    }else if(oper == "-"){
        operation = "-";
    }else{
        operation = "+";
    }

    ret = operation

    updateScreen();
    updateSecondary(firstNumber);
}

function findAnswer(){
    secondNumber = ret;

    ret = "";

    var fn;
    var sn;

    if(firstNumber.includes(".") || secondNumber.includes(".")){
        fn = parseFloat(firstNumber);
        sn = parseFloat(secondNumber);
    }else{
        fn = parseInt(firstNumber);
        sn = parseInt(secondNumber);
    }

    if(operation == "*"){
        answer = fn * sn;
    }else if(operation == "/"){
        answer = fn / sn;
    }else if(operation == "-"){
        answer = fn - sn;
    }else{
        answer = fn + sn;
    }

    ret += answer; 

    if(ret == 'NaN'){
        ret = "";
    }

    updateScreen();
    updateSecondary(firstNumber + operation + secondNumber);
}

function clearScreen(){
    ret = "";
    document.getElementById("hi").innerHTML = "";
}

function deleteC(){
    if(!(operations.indexOf(ret) >= 0)){
        try{
            ret = ret.substring(0, ret.length-1);
        }catch(err){
            ret = "";
        }
    }else if (!(ret == 'SYNTAX ERROR')){
        tempStore = firstNumber;
        operation = "";
        clearScreen();
    }else{
        ret = "";   
    }
    updateScreen();
}

function emptyScreen(bool){
    firstNumber = "";
    secondNumber = "";
    operation = "";
    ret = "";
    document.getElementById("hi").innerHTML = "";
    if(bool){
        document.getElementById("previous-operand").innerHTML = "";
    }
}

function addDecimal(){
    if(!(toString(ret).includes("."))){
        ret += ".";
    }
    updateScreen();
}

function updateScreen(){
    document.getElementById("hi").innerHTML = ret;
}

function updateSecondary(text){
    document.getElementById("previous-operand").innerHTML = text;
}