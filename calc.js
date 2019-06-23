class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clearScreen();
  }

  clearScreen() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(num) {
    if (num === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + num.toString();
  }

  chooseOperation(opr){
    if (this.currentOperand === '') return
    if (this.previousOperand !== ''){
      this.calculate();
    }
    this.operation = opr;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  calculate(){
    let value;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operation){
      case '+':
        value = prev + current;
        break;
      case '-':
        value = prev - current;
        break;
      case '÷':
        value = prev/current;
        break
      case 'x':
        value = prev * current;
        break
      default:
        return
    }
    this.currentOperand = value;
    this.operation = undefined;
    this.previousOperand = '';

  }

  getDisplayFormat(num){
    const stringNum = num.toString();
    const intDigit = parseFloat(stringNum.split('.')[0]);
    const decDigit = stringNum.split('.')[1];
    let intDisplay
    if (isNaN(intDigit)) {
      intDisplay = '';
    } else {
      intDisplay = intDigit.toLocaleString('en', {maximumFractionDigits: 0});
    }
    if (decDigit != null){
      return  `${intDisplay}.${decDigit}`
    } else {
      return intDisplay;
    }

    const floatNum = parseFloat(num);
    if (isNaN(floatNum)) return ''
    return floatNum.toLocaleString('en');
  }

  updateDisplay(){
    this.currentText.innerText = this.getDisplayFormat(this.currentOperand);
    if (this.operation != null){
      this.previousText.innerText = `${this.getDisplayFormat(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousText.innerText = '';
    }
  }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operandButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousText = document.querySelector('[data-previous]');
const currentText = document.querySelector('[data-current]');

//initialize calculator object
const calc = new Calculator(previousText, currentText);


//add eventListeners from buttons to calc object
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
  });
});

operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    calc.chooseOperation(button.innerText);
    calc.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calc.calculate();
  calc.updateDisplay();
  setTimeout(calc.clearScreen(), 100);
});

clearButton.addEventListener('click', button => {
  calc.clearScreen();
  calc.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calc.delete();
  calc.updateDisplay();
});
