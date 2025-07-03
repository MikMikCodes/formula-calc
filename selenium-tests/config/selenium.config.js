const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

class SeleniumConfig {
  constructor() {
    this.browser = process.env.BROWSER || 'chrome';
    this.headless = process.env.HEADLESS === 'true';
    this.timeout = 30000;
  }

  async createDriver() {
    let builder = new Builder().forBrowser(this.browser);

    if (this.browser === 'chrome') {
      const options = new chrome.Options();
      if (this.headless) {
        options.addArguments('--headless=new');
      }
      options.addArguments(
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--window-size=1920,1080'
      );
      builder.setChromeOptions(options);
    } else if (this.browser === 'firefox') {
      const options = new firefox.Options();
      if (this.headless) {
        options.addArguments('-headless');
      }
      options.addArguments('--width=1920', '--height=1080');
      builder.setFirefoxOptions(options);
    }

    console.log(`🛠 Launching ${this.browser} driver...`);
    const driver = await builder.build();
    console.log(`✅ ${this.browser} driver is ready`);

    await driver.manage().setTimeouts({ implicit: this.timeout });
    return driver;
  }
}

module.exports = SeleniumConfig;
