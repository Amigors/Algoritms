//Задача: Прасер выражений с приоритетом и поддержкой скобок
//Написать программу, которая принимает на вход арифметическое выражение и вычисляет его результат, учитывая приоритет операций и скобки
//Например ("(3 + 2) * (7 - 4) / 5")
//
//Что нужно использовать:
// - Стек на массиве или связном списке - для хранения операторов и операндов при разборе выражения по алгоритму "Обратная польская нотация" (RPN)
// - Очередь (обычная или циклическая) - для формирования промежуточного представления выражения в RPN

class ExpressionParser {
  constructor() {
    this.operators = {
      "+": { precedence: 1, associativity: "left" },
      "-": { precedence: 1, associativity: "left" },
      "*": { precedence: 2, associativity: "left" },
      "/": { precedence: 2, associativity: "left" },
      "^": { precedence: 3, associativity: "right" },
    };
  }

  isOperator(token) {
    return token in this.operators;
  }

  getPrecedence(operator) {
    return this.operators[operator].precedence;
  }

  getAssociativity(operator) {
    return this.operators[operator].associativity;
  }

  shuntingYard(expression) {
    const output = [];
    const operatorStack = [];
    let i = 0;

    while (i < expression.length) {
      const token = expression[i];

      if (token === " ") {
        i++;
        continue;
      }

      if (/\d/.test(token)) {
        let num = token;
        while (i + 1 < expression.length && /\d/.test(expression[i + 1])) {
          i++;
          num += expression[i];
        }
        output.push(num);
        i++;
        continue;
      }

      if (this.isOperator(token)) {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "(" &&
          ((this.getAssociativity(token) === "left" &&
            this.getPrecedence(token) <=
              this.getPrecedence(operatorStack[operatorStack.length - 1])) ||
            (this.getAssociativity(token) === "right" &&
              this.getPrecedence(token) <
                this.getPrecedence(operatorStack[operatorStack.length - 1])))
        ) {
          output.push(operatorStack.pop());
        }
        operatorStack.push(token);
        i++;
        continue;
      }

      if (token === "(") {
        operatorStack.push(token);
        i++;
        continue;
      }

      if (token === ")") {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          output.push(operatorStack.pop());
        }
        if (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] === "("
        ) {
          operatorStack.pop();
        } else {
          throw new Error("Несогласованные скобки");
        }
        i++;
        continue;
      }

      throw new Error(`Неизвестный токен: ${token}`);
    }

    while (operatorStack.length > 0) {
      if (operatorStack[operatorStack.length - 1] === "(") {
        throw new Error("Несогласованные скобки");
      }
      output.push(operatorStack.pop());
    }

    return output;
  }

  evaluateRPN(rpn) {
    const stack = [];

    for (const token of rpn) {
      if (/\d+/.test(token)) {
        stack.push(parseFloat(token));
      } else {
        if (stack.length < 2) {
          throw new Error("Недостаточно операндов для оператора");
        }
        const b = stack.pop();
        const a = stack.pop();

        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            if (b === 0) {
              throw new Error("Деление на ноль");
            }
            stack.push(a / b);
            break;
          case "^":
            stack.push(Math.pow(a, b));
            break;
          default:
            throw new Error(`Неизвестный оператор: ${token}`);
        }
      }
    }

    if (stack.length !== 1) {
      throw new Error("Ошибка в выражении");
    }

    return stack[0];
  }

  evaluate(expression) {
    const rpn = this.shuntingYard(expression);
    return this.evaluateRPN(rpn);
  }
}

const parser = new ExpressionParser();

const result = parser.evaluate("(3 + 2) * (7 - 4) / 5");
console.log(result);
