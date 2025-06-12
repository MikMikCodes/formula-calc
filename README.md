# 🌙 Moon Moisture Formula Recalculator

Check out the web-based Moon Calc App by Moon Moisture LLC! This handy tool makes it a breeze for skincare creators to adjust batch sizes and ingredient percentages for all kinds of products like lotions, body butters, and scrubs. This app does the heavy lifting for you, even tracking water phase loss and fragrance splits visually.

## ✨ Features

- 📦 **Dynamic Ingredient Entry** – Add, edit, or remove ingredients as needed
- 🧪 **Auto Calculation** – Converts percentages to grams and ounces based on total batch size
- 🌊 **Water Weight Tracker** – Logs before & after heating to track evaporation
- 🌸 **Fragrance Split Tool** – Supports 1, 2, or 3 fragrance types with split ratio tracking
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile screens
- 💾 **Local Save** – Save, load, and delete formulas using localStorage

## 🚀 Getting Started

### 1. Clone or Download the Project
```bash
git clone https://github.com/MikMikCodes/moon-calc-app.git
cd moon-calc-app
```

- or download the ZIP and unzip it.

### 2. Install Dependencies
```bash
npm install
npm install cypress --save-dev
npm start
```

Open the browser and go to http://localhost:3000

## 🏗️ Built With

- React.Js -- Frontend UI framework
- localStorage - For saving formulas
- Cypress - End-to-end testing framework

## 📁 Project Structure

```
src/
├── components/                # Reusable components (PhaseTotals, IngredientsRow, etc.)
├── utils/                     # Helper functions for unit conversion
├── App.js                     # Main application logic
├── index.js                   # Entry point
```

## 🧪 Running Tests

```bash
npx cypress open
```
Cypress tests are located in cypress/e2e

## 🚀 Deployment

- This app was designed by using GitHub Pages.

## 👏 Credits

- Created with 💜 by Raemika Lugo
- For business: Moon Moisture LLC