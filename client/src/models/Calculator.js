
var Calculator = function(){}

Calculator.prototype = {

  calcInput: function(input){
    if(!input){return "0"}
    var splitInput = input.split(" ")
    if(this.isInvalidInput(splitInput)){return "0"}
    splitInput = this.bodmasCalc(splitInput, ["x", "/"])
    splitInput = this.bodmasCalc(splitInput, ["+", "-"])
    return splitInput[0]
  },

  bodmasCalc: function(splitInput, operatorArray){
    var newArray = splitInput
    while(this.isSelectedOperatorInArray(splitInput, operatorArray)){
      for(var i = 0; i < newArray.length; i++){
        if(this.isAnOperator(newArray[i]) && this.isSelectedOperator(newArray[i], operatorArray)){
          splitInput[i] = this.calc(splitInput[i - 1], splitInput[i + 1], splitInput[i])
          splitInput.splice(i -1, 1)
          splitInput.splice(i, 1)
          break
        }
      }
      var newArray = splitInput
    }
    return splitInput
  },

  isSelectedOperator: function(operator, operatorArray){
    for(var i = 0; i < operatorArray.length; i++){
      if(operator === operatorArray[i]){
        return true
      }
    }
    return false
  },

  isSelectedOperatorInArray: function(inputArray, operatorArray){
    for(var input of inputArray){
      for(var operator of operatorArray){
        if(operator === input){
          return true
        }
      }
    }
    return false
  },

  isAnOperatorMultiOrDivide: function(operator){
    if(operator === '/' || operator === 'x' ){
      return true
    }
    return false
  },

  isAnOperatorAddOrSubtract: function(operator){
    if(operator === '+' || operator === '-' ){
      return true
    }
    return false
  },

  convertPercentage: function(input){
    var result = this.calcInput(input)
    console.log(result)
    if(isNaN(result)){
      return "0"
    }else{
      return this.divide(result, 100)
    }
  },

  isInvalidInput: function(inputArray){
    for(var i = 0; i < inputArray.length; i++){
      if(this.isAnOperator(inputArray[i])){
        if(isNaN(parseFloat(inputArray[i-1])) || isNaN(parseFloat(inputArray[i+1]))){
          return true
        }
      }
    }
    return false
  },

  isAnOperator: function(operator){
    if(operator === "+" || operator === "-" || operator === "x" || operator === "/"){
      return true
    }
    return false
  },

  calc: function(n1, n2, operator){
    n1 = parseFloat(n1)
    n2 = parseFloat(n2)
    var result = "Invalid operator"
    switch(operator) {
        case "+":
            result = this.add(n1, n2)
            break;
        case "-":
            result = this.subtract(n1, n2)
            break;
        case "x":
            result = this.multiply(n1, n2)
            break;
        case "/":
            result = this.divide(n1, n2)   
    }
    return result
  },

  add: function(n1, n2){
    var result = ((n1 * 1000) + (n2 * 1000)) / 1000;
    return result
  },

  subtract: function(n1, n2){
    var result = ((n1 * 1000) - (n2 * 1000)) / 1000;
    return result
  },

  multiply: function(n1, n2){
    var result = ((n1 * 1000) * (n2 * 1000)) / 1000000;
    return result
  },

  divide: function(n1, n2){
    var result = n1 / n2;
    return result
  }

}

module.exports = Calculator;