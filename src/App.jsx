import { useState } from "react";
import { create, all } from "mathjs";
import "./App.css";

const math = create(all, {
  number: "BigNumber",
  precision: 120,
});

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [isRadians, setIsRadians] = useState(true);
  const [error, setError] = useState(false);

  const formatResult = (value) => {
    try {
      const num = math.bignumber(value);
      const rounded = math.format(num, { precision: 14 });
      const parts = rounded.split(".");

      if (parts.length === 2) {
        const decimals = parts[1].substring(0, 5);
        const trimmed = decimals.replace(/0+$/, "");
        return trimmed ? `${parts[0]}.${trimmed}` : parts[0];
      }
      return parts[0];
    } catch {
      return value.toString();
    }
  };

  const handleNumber = (num) => {
    if (error) {
      setError(false);
      setDisplay(num);
      setExpression(num);
      return;
    }

    if (display === "0" || display === "Error") {
      setDisplay(num);
      setExpression(num);
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  };

  const handleOperator = (op) => {
    if (error) {
      setError(false);
      setExpression(display + op);
      setDisplay(op);
      return;
    }

    const ops = { "×": "*", "÷": "/", "^": "^" };
    const mathOp = ops[op] || op;
    setExpression(expression + mathOp);
    setDisplay(op);
  };

  const handleFunction = (fn) => {
    if (error) {
      setError(false);
      setExpression("");
      setDisplay("0");
      return;
    }

    let func = fn;
    if (fn === "√") {
      func = "sqrt(";
    } else if (fn === "∛") {
      func = "cbrt(";
    } else if (fn === "ⁿ√") {
      func = "nthRoot(";
    } else if (fn === "xⁿ") {
      func = "pow(";
    } else {
      func = fn + "(";
    }

    setExpression(expression + func);
    setDisplay(fn);
  };

  const handleEquals = () => {
    if (error) {
      setError(false);
      setExpression("");
      setDisplay("0");
      return;
    }

    try {
      let expr = expression;

      // Convert degrees to radians if needed
      if (!isRadians) {
        expr = expr.replace(/sin\(/g, "sin((pi/180)*");
        expr = expr.replace(/cos\(/g, "cos((pi/180)*");
        expr = expr.replace(/tan\(/g, "tan((pi/180)*");
      }

      const result = math.evaluate(expr);
      const formatted = formatResult(result);
      setDisplay(formatted);
      setExpression(formatted);
    } catch (err) {
      setDisplay("Error");
      setError(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setError(false);
  };

  const handleBackspace = () => {
    if (error) {
      handleClear();
      return;
    }

    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else {
      setDisplay("0");
      setExpression("");
    }
  };

  const handleNegate = () => {
    if (error) return;

    if (display !== "0" && display !== "Error") {
      const negated = display.startsWith("-")
        ? display.slice(1)
        : "-" + display;
      setDisplay(negated);
      setExpression(
        expression.startsWith("-") ? expression.slice(1) : "-" + expression
      );
    }
  };

  const handleDecimal = () => {
    if (error) {
      setError(false);
      setDisplay("0.");
      setExpression("0.");
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
      setExpression(expression + ".");
    }
  };

  const handleParenthesis = (paren) => {
    if (error) {
      setError(false);
      setExpression(paren);
      setDisplay(paren);
      return;
    }

    setExpression(expression + paren);
    setDisplay(paren);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="expression">{expression || "0"}</div>
          <div className="result">{display}</div>
        </div>

        <div className="mode-toggle">
          <button
            className={isRadians ? "active" : ""}
            onClick={() => setIsRadians(true)}
          >
            RAD
          </button>
          <button
            className={!isRadians ? "active" : ""}
            onClick={() => setIsRadians(false)}
          >
            DEG
          </button>
        </div>

        <div className="keypad">
          <button onClick={handleClear} className="function">
            C
          </button>
          <button onClick={() => handleParenthesis("(")} className="function">
            (
          </button>
          <button onClick={() => handleParenthesis(")")} className="function">
            )
          </button>
          <button onClick={handleBackspace} className="function">
            ⌫
          </button>

          <button onClick={() => handleFunction("sin")}>sin</button>
          <button onClick={() => handleFunction("cos")}>cos</button>
          <button onClick={() => handleFunction("tan")}>tan</button>
          <button onClick={() => handleOperator("÷")} className="operator">
            ÷
          </button>

          <button onClick={() => handleFunction("√")}>√</button>
          <button onClick={() => handleFunction("∛")}>∛</button>
          <button onClick={() => handleFunction("ⁿ√")}>ⁿ√</button>
          <button onClick={() => handleOperator("×")} className="operator">
            ×
          </button>

          <button onClick={() => handleNumber("7")}>7</button>
          <button onClick={() => handleNumber("8")}>8</button>
          <button onClick={() => handleNumber("9")}>9</button>
          <button onClick={() => handleOperator("-")} className="operator">
            −
          </button>

          <button onClick={() => handleNumber("4")}>4</button>
          <button onClick={() => handleNumber("5")}>5</button>
          <button onClick={() => handleNumber("6")}>6</button>
          <button onClick={() => handleOperator("+")} className="operator">
            +
          </button>

          <button onClick={() => handleNumber("1")}>1</button>
          <button onClick={() => handleNumber("2")}>2</button>
          <button onClick={() => handleNumber("3")}>3</button>
          <button onClick={() => handleOperator("^")} className="operator">
            ^
          </button>

          <button onClick={handleNegate}>±</button>
          <button onClick={() => handleNumber("0")}>0</button>
          <button onClick={handleDecimal}>.</button>
          <button onClick={handleEquals} className="operator equals">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
