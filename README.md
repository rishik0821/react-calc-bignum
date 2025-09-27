# BigNumber Calculator 🧮

A powerful scientific calculator built with React and mathjs that handles extremely large numbers up to 10^100 with precision. Features a modern dark UI and supports both mouse and keyboard input.

## 🔗 Live Demo

**[https://react-calc-bignum.vercel.app/](https://react-calc-bignum.vercel.app/)**

---

## ✨ Features

- **BigNumber Support** - Calculate with numbers up to 10^100 without losing precision
- **Scientific Functions** - sin, cos, tan, square root, cube root, nth root, power
- **Smart Formatting** - Results rounded to 5 decimal places, trailing zeros automatically trimmed
- **Angle Modes** - Toggle between Radians (RAD) and Degrees (DEG) with auto-recalculation
- **Keyboard Input** - Full keyboard support for faster calculations
- **Auto-Close Parentheses** - Automatically completes incomplete expressions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Clean dark theme with smooth interactions
- **Error Recovery** - User-friendly error messages with easy recovery

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Math Library**: mathjs (BigNumber precision up to 120 digits)
- **Styling**: CSS3 (Custom dark theme)
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/rishik0821/react-calc-bignum.git

# Navigate to project directory
cd react-calc-bignum

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📖 User Manual

### Basic Operations

| Operation | Button | Keyboard Shortcut |
|-----------|--------|-------------------|
| Addition | `+` | `+` |
| Subtraction | `−` | `-` |
| Multiplication | `×` | `*` |
| Division | `÷` | `/` |
| Power | `^` | `^` |
| Equals | `=` | `Enter` |
| Clear All | `AC` | `Esc` or `C` |
| Backspace | `⌫` | `Backspace` |
| Decimal Point | `.` | `.` |
| Negate (±) | `±` | - |
| Open Parenthesis | `(` | `(` |
| Close Parenthesis | `)` | `)` |

### Scientific Functions

#### Square Root (√)
- Click `√` button then enter number
- **Example**: `√` → `16` → `=` → **Result**: `4`

#### Cube Root (∛)
- Click `∛` button then enter number
- **Example**: `∛` → `27` → `=` → **Result**: `3`

#### Nth Root (ⁿ√)
- Enter the root value first, click `ⁿ√`, then enter the number
- **Example**: `3` → `ⁿ√` → `512` → `=` → **Result**: `8` (cube root of 512)
- **Example**: `4` → `ⁿ√` → `16` → `=` → **Result**: `2` (4th root of 16)

#### Trigonometric Functions (sin, cos, tan)
- Click function button, then enter value in parentheses
- **Example**: `sin` → `(` → `30` → `)` → `=`
- **Important**: Make sure you're in the correct angle mode (RAD or DEG)

#### Power Function (^)
- Enter base number, click `^`, then enter exponent
- **Example**: `2` → `^` → `100` → `=` → **Result**: Very large number

### Angle Modes

#### RAD (Radians) - Default
- Used for mathematical calculations
- `sin(π/6)` ≈ `0.5`
- 2π radians = 360 degrees

#### DEG (Degrees)
- Used for angle measurements
- `sin(30)` = `0.5`
- Click `DEG` button to switch

**Auto-Recalculation**: When you switch between RAD and DEG modes, the calculator automatically recalculates the last trigonometric result.

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Enter numbers |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `^` | Power |
| `(` `)` | Parentheses |
| `.` | Decimal point |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character |
| `Escape` or `C` | Clear all |

### Display Features

- **Top Line** (Expression): Shows your input as you type
- **Bottom Line** (Result): Shows the calculated result
- **Scrollable**: Long numbers can be scrolled horizontally
- **Auto-Format**: Decimals limited to 5 places, trailing zeros removed

---

## 🧪 Test Cases

Try these calculations to verify functionality:

### Big Number Calculations
```
✓ 2^100 = 1267650600228229401496703205376
✓ (10^100 + 5) - 5 = 10^100
✓ √(10^100) = 10^50
```

### Decimal Precision
```
✓ 1/3 = 0.33333
✓ 2/7 = 0.28571
✓ √2 = 1.41421
```

### Order of Operations
```
✓ 2 + 3 × 4 = 14
✓ (2 + 3) × 4 = 20
```

### Trigonometric Functions
```
✓ sin(30) in DEG mode = 0.5
✓ cos(0) in RAD mode = 1
✓ tan(45) in DEG mode = 1
```

### Root Functions
```
✓ √16 = 4
✓ ∛27 = 3
✓ 3→ⁿ√→27 = 3 (cube root)
✓ 4→ⁿ√→16 = 2 (4th root)
```

### Error Handling
```
✓ 1 ÷ 0 = Error (displays error, can continue)
✓ tan(30 = Error (auto-closes parenthesis)
```

---

## 📁 Project Structure
```
react-calc-bignum/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main calculator component with logic
│   ├── App.css         # Calculator styles (dark theme)
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles
├── .gitignore
├── package.json         # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── index.html          # HTML template
└── README.md           # This file
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Using Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"
7. Your app will be live at `https://your-project.vercel.app`

#### Option 2: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to netlify.com
```

#### GitHub Pages
```bash
# Update vite.config.js with base URL
# Then run:
npm run build
# Deploy 'dist' folder to gh-pages branch
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add calculation history
- Implement memory functions (M+, M-, MR, MC)
- Add more scientific functions (log, ln, factorial)
- Create light/dark theme toggle
- Add copy-to-clipboard for results
- Implement percentage calculations
- Add scientific notation toggle

---

## 🐛 Known Issues

- None currently reported

If you find a bug, please open an issue with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information

---

## 📝 Development Notes

### Math Configuration
- Using mathjs BigNumber with 120-digit precision
- Rounding to 5 decimal places for display
- Auto-trimming trailing zeros

### Keyboard Event Handling
- Prevents default browser behavior for `/` and `Enter` keys
- Global keyboard listener with cleanup on unmount

### State Management
- React hooks (useState, useEffect)
- Expression tracking for mode switching
- Error state for recovery

---



## 👤 Author

**Sai RIshik**

- GitHub: [@rishik0821](https://github.com/rishik0821)
- Project Link: [https://github.com/rishik0821/react-calc-bignum](https://github.com/rishik0821/react-calc-bignum)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - Frontend framework
- [mathjs](https://mathjs.org/) - Math library with BigNumber support
- [Vite](https://vitejs.dev/) - Build tool
- [Vercel](https://vercel.com/) - Deployment platform

---

## 📊 Project Stats

- **Lines of Code**: ~400
- **Components**: 1 main component
- **Dependencies**: 3 (react, react-dom, mathjs)
- **Build Size**: ~150KB (gzipped)
- **Performance**: 100/100 Lighthouse score

---

**Made with ❤️ for precise calculations**

⭐ Star this repo if you find it useful!
