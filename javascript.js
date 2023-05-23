
class Calculator {
  constructor(previuosOperationText, currentOperationText, historyContent) {
    this.previuosOperationText = previuosOperationText;
    this.currentOperationText = currentOperationText;

    this.historyContent = historyContent;
    this.currentOperation = "";
    this.previuosOperation = "";
    this.operator = undefined;
    
  }

  clearAll() {
    this.currentOperation = "";
    this.previuosOperationText.innerText = "";
    this.operator = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  negative() {
    if (this.currentOperation.includes("-") || this.currentOperation === "") {
      return null;
    }
    this.currentOperation = "-" + this.currentOperation;
  }

  sqrt() {
    if (this.currentOperation === "") {
      return null;
    }
    this.currentOperation = Math.sqrt(this.currentOperation);
  }

  log() {
    if (this.currentOperation === "") {
      return null;
    }
    this.currentOperation = Math.log10(this.currentOperation);
  }

  in() {
    if (this.currentOperation === "") {
      return null;
    }
    this.currentOperation = Math.log(this.currentOperation);
  }

  addNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) {
      return null;
    }
    this.currentOperation = this.currentOperation.toString() + number.toString();
  }

  choseOperation(operator) {
    if (this.currentOperation === "") {
      return null;
    }
    if (this.previuosOperation !== "") {
      return this.result();
    }
    this.operator = operator;
    this.previuosOperation = this.currentOperation;
    this.currentOperation = "";
  }

  result() {
    let computation;
    const prev = parseFloat(this.previuosOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(prev) || isNaN(current)) {
      return null;
    }
    switch (this.operator) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "^":
        computation = prev ** current;
        break;
      case "%":
        computation = (prev * current) / 100;
        break;
      default:
        return null;
    }
    this.currentOperation = computation;
    this.history(prev,this.operator,current,computation);
    this.operator = undefined;
    this.previuosOperation = "";
  }

  history(prev, operator, current, computation) {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const p = document.createElement('p');
    span.innerText = `${prev} ${operator} ${current}`;
    p.innerText = computation;
    div.appendChild(span);
    div.appendChild(p);
    this.historyContent.appendChild(div);
    div.classList.add("content");
    div.addEventListener("click", () => {
      this.currentOperation = computation;
      this.update();
    })
  }

  update() {
    this.currentOperationText.innerText = this.currentOperation;
    if (this.operator != undefined) {
      this.previuosOperationText.innerText = `${this.previuosOperation} ${this.operator}`;
    } else {
      this.previuosOperationText.innerText = "";
    }
  }
}

const numberKeys = document.querySelectorAll("[data-number]");

const operatorKeys = document.querySelectorAll("[data-operator]");

const egualKey = document.querySelector("[data-egual]");

const deleteKey = document.querySelector("[data-delete]");

const clearAllKey = document.querySelector("[data-clear-all]");

const previuosOperationText = document.querySelector("[data-previuos]");

const currentOperationText = document.querySelector("[data-display]");

const piKey = document.querySelector("[data-pi]");

const negativeKey = document.querySelector("[data-negative]");

const sqrtKey = document.querySelector("[data-sqrt]");

const logKey = document.querySelector("[data-log]");

const inKey = document.querySelector("[data-in]");

const historyButton = document.querySelector("#icon");

const closeHistoryButton = document.querySelector("#close");

const history = document.querySelector("#history");

const container = new Calculator(previuosOperationText, currentOperationText, history);

numberKeys.forEach((button) => {
  button.addEventListener("click", () => {
    container.addNumber(button.innerText);
    container.update();
  });
});

operatorKeys.forEach((button) => {
  button.addEventListener("click", () => {
    container.choseOperation(button.innerText);
    container.update();
  });
});

egualKey.addEventListener("click", () => {
  container.result();
  container.update();
});

clearAllKey.addEventListener("click", () => {
  container.clearAll();
  container.update();
});

deleteKey.addEventListener("click", () => {
  container.delete();
  container.update();
});

negativeKey.addEventListener("click", () => {
  container.negative();
  container.update();
});

sqrtKey.addEventListener("click", () => {
  container.sqrt();
  container.update();
});

logKey.addEventListener("click", () => {
  container.log();
  container.update();
});

inKey.addEventListener("click", () => {
  container.in();
  container.update();
});

historyButton.addEventListener("click", () => {
  document.getElementById("history").style.width = "70%";
  document.getElementById("history").style.visibility = "visible";
  historyButton.style.visibility = "hidden";
  closeHistoryButton.style.display = "block";
});

closeHistoryButton.addEventListener("click", () => {
  document.getElementById("history").style.width = "0%";
  document.getElementById("history").style.transition = "width 0.3s";
  historyButton.style.visibility = "visible";
  closeHistoryButton.style.display = "none";
});

let body = document.querySelector("body"),
icons = document.querySelector(".icons");

icons.onclick = ()=>{
  body.classList.toggle("dark");
}