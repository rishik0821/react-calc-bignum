# Development Prompts History

This document contains all the prompts used to build this BigNumber Calculator project from scratch to deployment.

---

## Initial Project Setup

### Prompt 1: Project Requirements
```
Hey act like You are my step-by-step build copilot. We will create a React calculator that:
* Works correctly up to 10^100 using big-number math.
* Formats results to max 5 decimal places (round half up) and trims trailing zeros.
* Supports + - × ÷ ^ √ sin cos ( ) and =, C, ⌫, ±, ., cube root, trigonometric functions, power to the n, root to the n 
* Optional: radians↔degrees toggle (default radians).
* Deploy to Vercel and push to GitHub with small, incremental commits (no giant dump).

HOW WE WORK
At each step:
1. Propose a tiny plan + acceptance criteria.
2. Give exact commands and minimal code (full file or patch).
3. Provide one short commit message.
4. Stop until I say "NEXT".

TECH (keep it simple)
* React + Vite (JavaScript, not TypeScript).
* mathjs with { number: 'BigNumber', precision: 120 } for correctness up to 10^100.
* Lightweight CSS; no design system needed.

MILESTONES (one at a time)
1. Init: Vite React app, first commit, GitHub push.
2. UI: Display + keypad layout wired to simple state.
3. Math Core: Use mathjs BigNumber, support + - × ÷ ^ √, parentheses, errors (e.g., ÷0).
4. Trig & Toggle: sin, cos, radians default, simple degrees toggle.
5. Formatting: Centralize rounding to 5 dp, trim zeros; examples: 1/3→0.33333, √2→1.41421.
6. Deploy: Connect repo to Vercel, public URL live.

START
Ask me for:
* Repo name
* Vercel project name
* Package manager (npm/yarn/pnpm)
```

### Prompt 2: Cursor IDE Context
```
I'll be using cursor, remember that and feel free to use it's features aswell, 
react-calc-bignum, npm, start with folder creation and continue, 
Github repo push should be meaningful and incremental
```

---

## Development Phase

### Prompt 3: Simplification Request
```
 step by step please don't clumsyfy it
```

### Prompt 4: Complete Code Request
```
i need complete project finals codes one by one
```

### Prompt 5: UI Issues - Display & Layout
```
is'nt it inconvenient why is adjusting the entire frame, calculator should be same right? 
and this is showing like a phone ui, it should be responsive this for phone is fine but 
if for desktop its not, if there is big number result should be in the dial only if it 
exceeds it should be scrollable
```

### Prompt 6: BigNumber Formatting Issues
```
I did not like the ui of calculator and the big number i can't get it i did some big power 
and it gave me this output i did not like this and im not sure what i should do with this, 
point upto 5 means if there are any decimal results only right change it UI should be unique 
and modern industry standard
```

### Prompt 7: Display Container Fix
```
you didn't fix this though [regarding display cutoff]
```

### Prompt 8: Mode Toggle Auto-Recalculate
```
looks good, if we are using trigonometric functions then if it is in rad and then if we 
shift to deg it should directly give deg rather than entering the calc again
```

### Prompt 9: Auto-Close Parentheses
```
[Image showing tan(30 error] fix this
```

### Prompt 10: nth Root & Keyboard Input
```
nth root function is not working accordingly fix that and i should be able to type in the 
dialogue not just use boxes
```

### Prompt 11: Intuitive nth Root
```
nth root is not typical so use something diff, like 4 + nthroot button + number equals 
4throot of number fix this and proceed to next step
```

---

## Deployment Phase

### Prompt 12: Deploy to Vercel
```
NEXT [ready to deploy]
```

### Prompt 13: Public Access Confirmation
```
i need it to be publicly accessible is this free?
```

### Prompt 14: Deployment Complete
```
https://react-calc-bignum.vercel.app/ [live URL provided]
```

---



## Key Decisions Made During Development

1. **Framework Choice**: React + Vite (JavaScript, not TypeScript)
2. **Math Library**: mathjs with BigNumber precision: 120
3. **Styling**: Custom CSS with modern dark theme
4. **Deployment**: Vercel (free tier for public access)
5. **UI Pattern**: 4-column grid layout, responsive for mobile/desktop
6. **Keyboard Support**: Full keyboard input added for better UX
7. **nth Root Logic**: Changed from `nthRoot(x, n)` to intuitive `n → button → x`
8. **Auto Features**: 
   - Auto-close parentheses
   - Auto-recalculate on RAD/DEG toggle
   - Auto-format decimals (5 places max, trim zeros)

---

## Evolution of Requirements

### Initial → Final Changes
- Started with basic calculator → Added full scientific functions
- Basic UI → Modern dark theme with responsive design
- Button-only input → Added full keyboard support
- Complex nth root syntax → Intuitive number-button-number pattern
- Manual parentheses → Auto-close on equals
- Static mode toggle → Auto-recalculation on mode switch

---

## Lessons Learned

1. **Incremental Development**: Step-by-step approach helped catch issues early
2. **User Feedback**: Real-time testing revealed UX improvements needed
3. **Responsive Design**: Desktop and mobile require different considerations
4. **BigNumber Handling**: Proper formatting crucial for large number display
5. **Auto-Features**: Small automations greatly improve user experience
6. **Documentation**: Clear README essential for open-source projects

---

## Project Statistics

- **Development Time**: Single session with iterative improvements
- **Total Commits**: ~15 incremental, meaningful commits
- **Code Files**: 4 main files (App.jsx, App.css, index.css, main.jsx)
- **Lines of Code**: ~400 lines
- **Deployment Platform**: Vercel (free tier)
- **Live URL**: https://react-calc-bignum.vercel.app/

---


## Features Implemented (In Order)

1. ✅ Vite + React project setup
2. ✅ Basic calculator UI layout
3. ✅ BigNumber integration (mathjs)
4. ✅ Basic operations (+, -, ×, ÷)
5. ✅ Scientific functions (√, ∛, sin, cos, tan, ^)
6. ✅ Parentheses support
7. ✅ RAD/DEG angle mode toggle
8. ✅ Smart decimal formatting (5 places, trim zeros)
9. ✅ Modern dark UI theme
10. ✅ Responsive design (mobile + desktop)
11. ✅ Scrollable display for long numbers
12. ✅ Full keyboard input support
13. ✅ Auto-close parentheses
14. ✅ Auto-recalculate on mode switch
15. ✅ Intuitive nth root (n → button → x)
16. ✅ Error handling with recovery
17. ✅ Vercel deployment
18. ✅ Documentation (README + PROMPTS)

---

## Challenges Overcome

### Challenge 1: BigNumber Display Formatting
**Problem**: Scientific notation (e+698) appearing for large numbers  
**Solution**: Used mathjs `format()` with `notation: 'fixed'` to display full numbers

### Challenge 2: Responsive Layout
**Problem**: Calculator stretching awkwardly on desktop  
**Solution**: Fixed width calculator (480px desktop, 380px mobile) with centered layout

### Challenge 3: nth Root UX
**Problem**: Complex `nthRoot(x, n)` syntax difficult for users  
**Solution**: Intuitive flow: type n → click ⁿ√ → type x → press =

### Challenge 4: Display Overflow
**Problem**: Long numbers getting cut off  
**Solution**: Horizontal scrolling with custom scrollbars in display area

### Challenge 5: Mode Switching
**Problem**: Had to re-enter calculation when switching RAD/DEG  
**Solution**: Store original expression and auto-recalculate on mode change

---

## Future Enhancement Ideas

If you want to extend this project:

1. **Calculation History**
   - Store last 10 calculations
   - Click to reuse previous results

2. **Memory Functions**
   - M+, M-, MR, MC buttons
   - Store values in memory

3. **More Scientific Functions**
   - log, ln (logarithms)
   - factorial (!)
   - absolute value |x|
   - modulo (%)

4. **Theme Toggle**
   - Light/dark mode switch
   - Multiple color schemes

5. **Copy/Paste**
   - Copy result to clipboard
   - Paste numbers from clipboard

6. **Scientific Notation Toggle**
   - Switch between full and scientific notation
   - User preference for large numbers

7. **Precision Control**
   - User-adjustable decimal places
   - Custom rounding modes

8. **Unit Conversions**
   - Angle: deg/rad/grad
   - Temperature: C/F/K
   - Length, weight, etc.

---

## 🧪 Test Cases (copy-paste)

### BigNumber Correctness
- [ ] `2^100` ⇒ `1267650600228229401496703205376`
- [ ] `(10^100 + 5) - 5` ⇒ `10^100`
- [ ] `√(10^100)` ⇒ `10^50`

### Decimal Precision & Formatting (max 5 dp, trim zeros)
- [ ] `1/3` ⇒ `0.33333`
- [ ] `2/7` ⇒ `0.28571`
- [ ] `√2` ⇒ `1.41421`
- [ ] `2.50000` ⇒ `2.5` (trailing zeros trimmed)

### Parentheses & Precedence
- [ ] `2 + 3 × 4` ⇒ `14`
- [ ] `(2 + 3) × 4` ⇒ `20`
- [ ] `((1+2)*(3+4))` ⇒ `21`

### Roots & Powers
- [ ] `√16` ⇒ `4`
- [ ] `∛27` ⇒ `3`
- [ ] `3 → ⁿ√ → 512` ⇒ `8` (cube root)
- [ ] `4 → ⁿ√ → 16` ⇒ `2` (4th root)
- [ ] `5^0` ⇒ `1`
- [ ] `(-2)^3` ⇒ `-8`

### Trigonometry
**Radians (default)**
- [ ] `sin(π/6)` ⇒ `0.5`
- [ ] `cos(0)` ⇒ `1`
- [ ] `tan(π/4)` ⇒ `1`

**Degrees (after toggle to DEG)**
- [ ] `sin(30)` ⇒ `0.5`
- [ ] `cos(60)` ⇒ `0.5`
- [ ] `tan(45)` ⇒ `1`

**Mode Toggle Auto-Recalc**
- [ ] Enter `sin(π/6)` in RAD ⇒ `0.5`, toggle to **DEG** ⇒ updates to `sin(30)` ⇒ `0.5`
- [ ] Enter `cos(60)` in **DEG** ⇒ `0.5`, toggle to **RAD** ⇒ updates to `cos(π/3)` ⇒ `0.5`

### Error Handling & Recovery
- [ ] `1 ÷ 0` ⇒ show **Error**, next input clears and app remains usable
- [ ] `tan(30` (missing `)`) ⇒ auto-close on `=` or show friendly fix
- [ ] `√(-1)` (in real mode) ⇒ show **Error** (or unsupported)

### Keyboard & UX
- [ ] Digits `0–9`, operators `+ - * / ^`, `(` `)` work from keyboard
- [ ] `Enter`/`=` computes, `Backspace` deletes, `Esc`/`C` clears
- [ ] Long results scroll horizontally in the display area
- [ ] `±` toggles sign correctly (e.g., `5 ±` ⇒ `-5`, `-5 ±` ⇒ `5`)

### UI/UX Features
- [ ] Keyboard input works
- [ ] Parentheses auto-close
- [ ] Long numbers scroll
- [ ] RAD/DEG auto-recalculates
- [ ] Error shows and recovers
- [ ] Responsive on mobile
- [ ] Responsive on desktop



---

*This prompts file serves as both a development log and a learning resource for understanding the iterative development process.*
