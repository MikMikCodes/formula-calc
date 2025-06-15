const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async () => {
  const options = new chrome.Options();
  options.addArguments("--headless=new", "--disable-gpu", "--no-sandbox");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    console.log("🧪 Launching Chrome...");

 
    const APP_URL = "https://mikmikcodes.github.io/formula-calc/";
    await driver.get(APP_URL);
    console.log("🌍 Navigated to:", APP_URL);

   
    await driver.wait(until.elementLocated(By.css('[data-cy="app-container"]')), 10000);
    console.log("✅ App container found");

    
    const title = await driver.getTitle();
    console.log("📄 Page title:", title);

    if (title !== "MM Formula Recalculator") {
      throw new Error("Unexpected page title: " + title);
    }

    console.log("🎉 Test passed: App is running and loaded correctly!");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
    console.log("🧹 Closed browser");
  }
})();
