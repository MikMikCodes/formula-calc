# 🌙 Moon Moisture Formula Recalculator

Hey there, I'm Mika, the owner of Moon Moisture Skincare and the creator of this app. Let me tell you, this app is a total game-changer for skincare creators like me. It helps us scale formulas, track ingredients, and stay super organized. Whether you're whipping up lotions, butters, or scrubs, this tool can recalculate based on batch size, monitor water phase loss, and even split fragrance formulas.

## ✨ Features

- **Ingredient Calculator** – Add ingredients + get auto conversions in grams/oz
- **Water Phase Tracker** – Watch your water phase weight before/after heating to track evaporation
- **Fragrance Split Tool** – Split up to 3 fragrances using set ratios
- **Responsive Design** – Works on desktop, tablet, and mobile screens
- **Save Formulas with Versions** – No more “wait, which version was that?”
- **Responsive Design** – Works on laptop, tablet, or phone
- **Offline Backup** – If the database is down, it keeps your data safe locally

## Tech Stack

- **Frontend:** React.js, HTML5, CSS3  
- **Backend:** Node.js + Express  
- **Database:** MySQL (with localStorage fallback)  
- **Testing:** Cypress (E2E) + Selenium (manual test scripts)

## Try It Out

[Moon Moisture Formula Calculator](https://mikmikcodes.github.io/formula-calc/)


## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Git
- XAMPP or MySQL server

---

### 1. Clone the Repo
```bash
git clone https://github.com/MikMikCodes/formula-calc.git
cd formula-calc
```

Or download the ZIP and unzip.

---

### 2. Database Setup

- Start XAMPP and run Apache + MySQL  
- Open [phpMyAdmin](http://localhost/phpmyadmin)  
- Create a new database: `moon_moisture_db`  
- Run the SQL schema from `/backend/db.sql` or paste manually

---

### 3. Install Dependencies
```bash
# Frontend
npm install
npm install cypress --save-dev

# backend
cd backend
npm install
cd ..
```
---

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
Open your browser to: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure
```
src/
├── components/              # Reusable UI
├── services/                # API calls
├── utils/                   # Helper functions
├── App.js                   # Main app
└── index.js                 # Entry point

backend/
├── server.js                # Express server
└── db.sql                   # MySQL schema

cypress/
├── e2e/                     # Main Cypress tests
├── fixtures/                # Test data
├── support/                 # Commands/setup
├── screenshots/             # Failure captures
└── docs/testing-report.md   # Test reports

selenium-tests/
└── manual/formula-test-runner.js # Headless Selenium script
```

---

## 🧪 Running Tests

### Cypress

```bash
npx cypress open
```

### Selenium

```bash
# Install Selenium packages
npm install selenium-webdriver chromedriver

# Run test
node selenium-tests/manual/formula-test-runner.js
```



## API Endpoints

- `GET /api/formulas` – Get all formulas  
- `POST /api/formulas` – Save a formula  
- `DELETE /api/formulas/:name` – Remove a formula + versions  
- `GET /api/ingredients` – Pull your ingredient list  

## Deployment

- Hosted on GitHub Pages  
- Compatible with Heroku, Railway, etc.  
- Supports MySQL or MariaDB (or fallback to localStorage)  

---

## Testing Strategy

- **Unit Testing:** Component-level logic
- **E2E Testing:** Full workflows (Cypress)
- **Selenium:** Cross-browser manual test script
- **API Testing:** Validates database + CRUD routes
- **LocalStorage Fallback:** Ensures offline usability


## Credits

Created with 💜 by Raemika L.  
Made for companies like Moon Moisture LLC because formulas should be as smooth as your skin.


---