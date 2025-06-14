// selenium-tests/config/selenium.config.js
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class SeleniumConfig {
  constructor() {
    this.browser = "chrome";
    this.timeout = 30000;
  }

  async createDriver() {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments(
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--window-size=1920,1080"
    );

    console.log("🛠 Launching ChromeDriver...");
    const driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
    console.log("✅ ChromeDriver is ready");

    await driver.manage().setTimeouts({ implicit: this.timeout });
    return driver;
  }
}

module.exports = SeleniumConfig;
