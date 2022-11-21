const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operator");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;

    });
});

operationEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num || dis2Num==="." ) return;
        haveDot = false;

        const operationName = e.target.innerText;
      
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
       
    });
});


function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    display1El.innerText = dis1Num;
    display2El.innerText = "";
    dis2Num = "";
    tempResultEl.innerText = result;
 };

function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    }
};


equalEl.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = "";
    dis2Num = result;
    dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "0";
    display2El.innerText = "0";
    result = "";
    tempResultEl.innerText = "0";
});

clearLastEl.addEventListener("click", () => {
    display2El.innerText = dis2Num.slice(0, -1);
    dis2Num = display2El.innerText;
});

window.addEventListener("keyup", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "." ||
        e.key==="Shift"
    ) {
        clickButtonEl(e.key);

    } else if (e.key === "+" || e.key === "-" || e.key === "/"  ) {
        clickOperator(e.key);
    } else if (e.key === "*" ) {
        clickOperator("x");

    } else if (e.key == "Enter" || e.key === "=") {
        clickEqual();
    } else if (e.key=="Backspace"){
         clickToClear()
    } else if (e.key=="Delete"){
         clickToClearAll()
    } else {
        alert("Only Numbers Are Allowed")
    }

});

function clickButtonEl(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
             button.click();
        }
    });
}

function clickOperator(key) {
    operationEl.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

function clickEqual() {
    equalEl.click();
}

function clickToClear() {
    clearLastEl.click();
}

function clickToClearAll() {
    clearAllEl.click();
}