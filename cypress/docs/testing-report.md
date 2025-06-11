# 🧪 Cypress E2E Testing Report for Formula Recalculator

This document outlines the automated end-to-end (E2E) testing implemented using [Cypress](https://www.cypress.io/) for the Moon Moisture Formula Recalculator web app.

---

## ✅ Tested Features

- **Ingredient Entry & Validation**
  - Add, reorder, and remove ingredients.
  - Validate that total percentages equal 100%.

- **Fragrance Splitting Logic**
  - Show split input fields dynamically when "fragrance" is typed.
  - Calculate split weights and display correct scent names.

- **Water Weight Tracking**
  - Calculates water lost through heating.
  - Shows correct “add back” values.

- **Formula Save/Load/Delete**
  - Save formulas to local storage.
  - Load saved formulas into the UI.
  - Delete formulas and confirm proper UI behavior.

- **Phase Totals**
  - Displays total weight in grams and ounces for each phase.

- **Responsive Layout**
  - Verifies layout adapts correctly on mobile, tablet, and desktop screen sizes.

---

## ⚙️ Environment

- **Test Framework:** Cypress v12+
- **Command to Run Tests:**
  ```bash
  npx cypress open
  # or headless:
  npx cypress run
