const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: (process.env.CYPRESS_BASE_URL =
      "https://mikmikcodes.github.io/formula-calc/" || "http://localhost:3000"),
    setupNodeEvents(on, config) {
      // Required placeholder for setup hooks
    },
  },
});
