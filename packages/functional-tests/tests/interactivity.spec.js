const { test, chromium } = require('@playwright/test');

const port = 8000;

(async () => {
  const browser = await chromium.launch({
    logger: {
      isEnabled: (name, severity) => name === 'browser',
      log: (name, severity, message, args) => console.log(`${name} ${message}`)
    }
  });
})();

test('Loads interactions without error', async ({ page, browserName }) => {
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().toString().includes("DevTools") && !msg.location().url.toString().includes("favicon"))
        throw new Error("Detected the following console error on test page: " + `"${msg.text()}"  +  ${JSON.stringify(msg.location())}`);
    });

    page.on('pageerror', exception => {
      throw new Error(`Uncaught exception: "${exception}"`);
    });

    // open page with a test lottie file
    await page.goto(`http://localhost:${port}`, {
      waitUntil: 'networkidle',
    });
});
