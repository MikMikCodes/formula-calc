# 🌙 Moon Moisture Formula Recalculator

Check out the web-based Moon Calc App by Moon Moisture LLC! This handy tool makes it a breeze for skincare creators to adjust batch sizes and ingredient percentages for all kinds of products like lotions, body butters, and scrubs. This app does the heavy lifting for you, even tracking water phase loss and fragrance splits visually.

## ✨ Features

- **Dynamic Ingredient Entry** – Add, edit, or remove ingredients as needed
- **Auto Calculation** – Converts percentages to grams and ounces based on total batch size
- **Water Weight Tracker** – Logs before & after heating to track evaporation
- **Fragrance Split Tool** – Supports 1, 2, or 3 fragrance types with split ratio tracking
- **Responsive Design** – Works on desktop, tablet, and mobile screens
- Database Integration – MySQL database with formula versioning and history
- Ingredient Catalog – Track suppliers, costs, and ingredient properties
- Version Control – Automatic formula versioning with change history
- Offline Fallback – LocalStorage backup when database is unavailable

## Getting Started
Prerequisites

Node.js (v14 or higher)
XAMPP or MySQL server
Git
- **Dynamic Ingredient Entry** – Add, edit, or remove ingredients as needed
- **Auto Calculation** – Converts percentages to grams and ounces based on total batch size
- **Water Weight Tracker** – Logs before & after heating to track evaporation
- **Fragrance Split Tool** – Supports 1, 2, or 3 fragrance types with split ratio tracking
- **Responsive Design** – Works on desktop, tablet, and mobile screens
- Database Integration – MySQL database with formula versioning and history
- Ingredient Catalog – Track suppliers, costs, and ingredient properties
- Version Control – Automatic formula versioning with change history
- Offline Fallback – LocalStorage backup when database is unavailable

## Getting Started
Prerequisites

Node.js (v14 or higher)
XAMPP or MySQL server
Git

### 1. Clone or Download the Project
```bash
git clone https://github.com/MikMikCodes/moon-calc-app.git
cd moon-calc-app
```

- or download the ZIP and unzip it.
- 
### 2. Database Setup

Start XAMPP and launch Apache + MySQL
Open phpMyAdmin (http://localhost/phpmyadmin)
Create database moon_moisture_db
Run the SQL schema:

```sql
CREATE DATABASE moon_moisture_db;
USE moon_moisture_db;

CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    supplier_id INT,
    cost_per_lb DECIMAL(10,2),
    cost_per_oz DECIMAL(10,2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

CREATE TABLE formulas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    version INT DEFAULT 1,
    total_batch_size DECIMAL(10,2),
    fragrance_splits TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE formula_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    formula_id INT,
    ingredient_id INT NULL,
    ingredient_name VARCHAR(255),
    percentage DECIMAL(5,2),
    phase VARCHAR(50),
    FOREIGN KEY (formula_id) REFERENCES formulas(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
```

### 3. Install Dependencies
```bash
#Frontend
#Frontend
npm install
npm install cypress --save-dev

#backend
cd backend
npm install
cd ..
```
4. Start the Application
```bash
# Start both frontend and backend
npm run dev

# OR start separately:
# Terminal 1: Backend
cd backend && node server.js

# Terminal 2: Frontend  

#backend
cd backend
npm install
cd ..
```
4. Start the Application
```bash
# Start both frontend and backend
npm run dev

# OR start separately:
# Terminal 1: Backend
cd backend && node server.js

# Terminal 2: Frontend  
npm start
```
Open the browser and go to http://localhost:3000

## 🏗️ Built With

- Frontend: React.js, CSS3, HTML5
- Backend: Node.js, Express.js
- Database: MySQL
- Testing: Cypress (E2E), Selenium (Cross-browser)
- Storage: MySQL with localStorage fallback
- Frontend: React.js, CSS3, HTML5
- Backend: Node.js, Express.js
- Database: MySQL
- Testing: Cypress (E2E), Selenium (Cross-browser)
- Storage: MySQL with localStorage fallback

## 📁 Project Structure

```
src/
├── components/                # Reusable UI components
│   ├── IngredientsRow.js     # Ingredient input row
│   ├── PhaseTotals.js        # Phase calculations
│   └── WaterWeightTracking.js # Water loss tracking
├── services/                  # API integration
│   └── api.js                # Database API calls
├── utils/                     # Helper functions
│   └── conversions.js        # Unit conversion utilities
├── components/                # Reusable UI components
│   ├── IngredientsRow.js     # Ingredient input row
│   ├── PhaseTotals.js        # Phase calculations
│   └── WaterWeightTracking.js # Water loss tracking
├── services/                  # API integration
│   └── api.js                # Database API calls
├── utils/                     # Helper functions
│   └── conversions.js        # Unit conversion utilities
├── App.js                     # Main application logic
└── index.js                   # Entry point

backend/
├── server.js                  # Express API server
└── package.json              # Backend dependencies

cypress/
├── docs/
│   └── testing-report.md          # Manually written or auto-generated reports
├── downloads/                     # Attachments or downloaded test artifacts
├── e2e/
│   ├── cypress.config.js          # Cypress config file
│   └── formula-calc-test.cy.js    # Main Cypress test for formula calculator
├── fixtures/                      # Mocked data for tests
├── screenshots/                   # Auto-generated screenshots on test failure
└── support/                       # Custom Cypress commands or setup


selenium-tests/
├── config/
│   └── selenium.config.js         # Optional driver config for future expansion
└── manual/
    └── formula-test-runner.js     # Working headless Selenium script

```

## 🧪 Running Tests

```bash
npx cypress open
```

Cross-Browser Testing (Selenium)
```bash
# Install Selenium dependencies
npm install selenium-webdriver

# Install required packages
npm install selenium-webdriver chromedriver

# Run the manual test script
node selenium-tests/manual/formula-test-runner.js
```

Test files are located in cypress/e2e/ and selenium-tests/

## API Endpoints

- GET /api/formulas - Retrieve all saved formulas
- POST /api/formulas - Save new formula with versioning
- DELETE /api/formulas/:name - Delete formula and all versions
- GET /api/ingredients - Get ingredient catalo

## 🚀 Deployment

- This app was designed by using GitHub Pages.
- Compatible with Heroku, Railway, or similar platforms
- Supports MySQL, MariaDB, or compatible services

## Testing Strategy
This application demonstrates comprehensive testing approaches:

- Unit Testing: Component-level validation
- Integration Testing: API endpoint testing
- End-to-End Testing: Complete user workflows (Cypress)
- Cross-Browser Testing: Multi-browser compatibility (Selenium)
- Database Testing: Data integrity and CRUD operations
- Compatible with Heroku, Railway, or similar platforms
- Supports MySQL, MariaDB, or compatible services

## Testing Strategy
This application demonstrates comprehensive testing approaches:

- Unit Testing: Component-level validation
- Integration Testing: API endpoint testing
- End-to-End Testing: Complete user workflows (Cypress)
- Cross-Browser Testing: Multi-browser compatibility (Selenium)
- Database Testing: Data integrity and CRUD operations

## 👏 Credits

- Created with 💜 by Raemika L.
- For business: Moon Moisture LLC

