import { useState, useEffect } from "react";
import { create, all } from "mathjs";
import "./App.css";

const math = create(all, {
  number: "BigNumber",
  precision: 120,
});

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [lastExpression, setLastExpression] = useState("");
  const [isRadians, setIsRadians] = useState(true);
  const [error, setError] = useState(false);
  const [nthRootN, setNthRootN] = useState(null); // Store the "n" for nth root

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumber(e.key);
      } else if (e.key === "+" || e.key === "-") {
        handleOperator(e.key);
      } else if (e.key === "*") {
        handleOperator("×");
      } else if (e.key === "/") {
        e.preventDefault();
        handleOperator("÷");
      } else if (e.key === "^") {
        handleOperator("^");
      } else if (e.key === "(" || e.key === ")") {
        handleParenthesis(e.key);
      } else if (e.key === ".") {
        handleDecimal();
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        handleClear();
      } else if (e.key === "Backspace") {
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display, expression, error, isRadians, lastExpression, nthRootN]);

  // Auto-recalculate when mode changes
  useEffect(() => {
    if (lastExpression && !error) {
      recalculate();
    }
  }, [isRadians]);

  const formatResult = (value) => {
    try {
      const str = value.toString();

      if (str.includes("e")) {
        return math.format(value, { notation: "fixed" });
      }

      if (!str.includes(".")) {
        return str;
      }

      const parts = str.split(".");
      if (parts[1]) {
        const decimals = parts[1].substring(0, 5).replace(/0+$/, "");
        return decimals ? `${parts[0]}.${decimals}` : parts[0];
      }

      return str;
    } catch {
      return value.toString();
    }
  };

  const recalculate = () => {
    try {
      let expr = lastExpression;

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
      // Keep current display if recalculation fails
    }
  };

  const handleNumber = (num) => {
    if (error) {
      setError(false);
      setDisplay(num);
      setExpression(num);
      setLastExpression("");
      setNthRootN(null);
      return;
    }

    if (nthRootN !== null) {
      // We're entering the number to take nth root of
      if (display === "0" || display.includes("√")) {
        setDisplay(num);
        setExpression(num);
      } else {
        setDisplay(display + num);
        setExpression(expression + num);
      }
      return;
    }

    if (display === "0" || display === "Error") {
      setDisplay(num);
      setExpression(num);
      setLastExpression("");
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
      setLastExpression("");
    }
  };

  const handleOperator = (op) => {
    if (error) {
      setError(false);
      setExpression(display + op);
      setDisplay(op);
      setLastExpression("");
      setNthRootN(null);
      return;
    }

    const ops = { "×": "*", "÷": "/", "^": "^" };
    const mathOp = ops[op] || op;
    setExpression(expression + mathOp);
    setDisplay(op);
    setLastExpression("");
    setNthRootN(null);
  };

  const handleFunction = (fn) => {
    if (error) {
      setError(false);
      setExpression("");
      setDisplay("0");
      setLastExpression("");
      setNthRootN(null);
      return;
    }

    let func = fn;
    if (fn === "√") {
      func = "sqrt(";
      setExpression(expression + func);
      setDisplay(fn);
      setLastExpression("");
      setNthRootN(null);
    } else if (fn === "∛") {
      func = "cbrt(";
      setExpression(expression + func);
      setDisplay(fn);
      setLastExpression("");
      setNthRootN(null);
    } else if (fn === "ⁿ√") {
      // Store current number as "n" for nth root
      const n = expression || display || "2";
      setNthRootN(n);
      setDisplay(`${n}√`);
      setExpression("");
      setLastExpression("");
      return;
    } else if (fn === "xⁿ") {
      setExpression(expression + "pow(");
      setDisplay("xⁿ(");
      setLastExpression("");
      setNthRootN(null);
      return;
    } else {
      func = fn + "(";
      setExpression(expression + func);
      setDisplay(fn);
      setLastExpression("");
      setNthRootN(null);
    }
  };

  const handleEquals = () => {
    if (error) {
      setError(false);
      setExpression("");
      setDisplay("0");
      setLastExpression("");
      setNthRootN(null);
      return;
    }

    try {
      let expr = expression;

      // Handle nth root if active
      if (nthRootN !== null) {
        expr = `nthRoot(${expression}, ${nthRootN})`;
        setNthRootN(null);
      }

      // Auto-close unclosed parentheses
      const openParens = (expr.match(/\(/g) || []).length;
      const closeParens = (expr.match(/\)/g) || []).length;
      const missingParens = openParens - closeParens;

      if (missingParens > 0) {
        expr += ")".repeat(missingParens);
      }

      // Store original expression for recalculation
      setLastExpression(expr);

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
      setLastExpression("");
      setNthRootN(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setLastExpression("");
    setError(false);
    setNthRootN(null);
  };

  const handleBackspace = () => {
    if (error) {
      handleClear();
      return;
    }

    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
      setLastExpression("");
    } else {
      setDisplay("0");
      setExpression("");
      setLastExpression("");
      setNthRootN(null);
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
      setLastExpression("");
    }
  };

  const handleDecimal = () => {
    if (error) {
      setError(false);
      setDisplay("0.");
      setExpression("0.");
      setLastExpression("");
      setNthRootN(null);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
      setExpression(expression + ".");
      setLastExpression("");
    }
  };

  const handleParenthesis = (paren) => {
    if (error) {
      setError(false);
      setExpression(paren);
      setDisplay(paren);
      setLastExpression("");
      setNthRootN(null);
      return;
    }

    setExpression(expression + paren);
    setDisplay(paren);
    setLastExpression("");
  };

  return (
    <div className="app-container">
      <div className="calculator">
        <div className="display-container">
          <div className="expression">
            {expression || nthRootN
              ? `${nthRootN || ""}${nthRootN ? "√" : ""}${expression}`
              : "0"}
          </div>
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
          <button onClick={handleClear} className="btn-function">
            AC
          </button>
          <button
            onClick={() => handleParenthesis("(")}
            className="btn-function"
          >
            (
          </button>
          <button
            onClick={() => handleParenthesis(")")}
            className="btn-function"
          >
            )
          </button>
          <button onClick={handleBackspace} className="btn-operator">
            ⌫
          </button>

          <button
            onClick={() => handleFunction("sin")}
            className="btn-function"
          >
            sin
          </button>
          <button
            onClick={() => handleFunction("cos")}
            className="btn-function"
          >
            cos
          </button>
          <button
            onClick={() => handleFunction("tan")}
            className="btn-function"
          >
            tan
          </button>
          <button onClick={() => handleOperator("÷")} className="btn-operator">
            ÷
          </button>

          <button onClick={() => handleFunction("√")} className="btn-function">
            √
          </button>
          <button onClick={() => handleFunction("∛")} className="btn-function">
            ∛
          </button>
          <button onClick={() => handleFunction("ⁿ√")} className="btn-function">
            ⁿ√
          </button>
          <button onClick={() => handleOperator("×")} className="btn-operator">
            ×
          </button>

          <button onClick={() => handleNumber("7")} className="btn-number">
            7
          </button>
          <button onClick={() => handleNumber("8")} className="btn-number">
            8
          </button>
          <button onClick={() => handleNumber("9")} className="btn-number">
            9
          </button>
          <button onClick={() => handleOperator("-")} className="btn-operator">
            −
          </button>

          <button onClick={() => handleNumber("4")} className="btn-number">
            4
          </button>
          <button onClick={() => handleNumber("5")} className="btn-number">
            5
          </button>
          <button onClick={() => handleNumber("6")} className="btn-number">
            6
          </button>
          <button onClick={() => handleOperator("+")} className="btn-operator">
            +
          </button>

          <button onClick={() => handleNumber("1")} className="btn-number">
            1
          </button>
          <button onClick={() => handleNumber("2")} className="btn-number">
            2
          </button>
          <button onClick={() => handleNumber("3")} className="btn-number">
            3
          </button>
          <button onClick={() => handleOperator("^")} className="btn-operator">
            ^
          </button>

          <button onClick={handleNegate} className="btn-number">
            ±
          </button>
          <button onClick={() => handleNumber("0")} className="btn-number">
            0
          </button>
          <button onClick={handleDecimal} className="btn-number">
            .
          </button>
          <button onClick={handleEquals} className="btn-equals">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
