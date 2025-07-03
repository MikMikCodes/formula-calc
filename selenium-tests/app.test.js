const { By, until } = require('selenium-webdriver');
const SeleniumConfig = require('./config/selenium.config');

const APP_URL = process.env.SELENIUM_BASE_URL || 'https://mikmikcodes.github.io/formula-calc/';

jest.setTimeout(30000);

describe('Moon Moisture Formula Recalculator App', () => {
  let driver;

  beforeAll(async () => {
    const config = new SeleniumConfig();
    driver = await config.createDriver();
    await driver.get(APP_URL);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('should load app and display correct title', async () => {
    await driver.wait(until.elementLocated(By.css('[data-cy="app-container"]')), 10000);
    const title = await driver.getTitle();
    expect(title).toBe('MM Formula Recalculator');
  });
});