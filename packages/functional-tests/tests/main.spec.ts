import { test, expect } from "@playwright/test";

const port = 8000;

test.describe("Player", ()=>{
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test
    await page.goto("http://localhost:" + port, { waitUntil: "domcontentloaded" });
  });

  test("is present", async ({ page }) => {
    const selector = "lottie-player";
    const element = await page.innerHTML(selector);
    expect(element).toBeDefined();
  });

  test("controls are present", async ({ page }) => {
    const selector = ".controls";
    const element = await page.$$(selector);
    expect(element.length).toBeGreaterThan(0);
  });

  test("seeker is present", async ({ page }) => {
    const selector = ".seeker";
    const element = await page.$$(selector);
    expect(element.length).toBeGreaterThan(0);
  });

  test("screenshot matches", async ({ page }) => {
    // wait for the page to load (could use some other signal?)
    await page.waitForTimeout(1000);

    const screenshot = await page.screenshot({fullPage: true});
    expect(screenshot).toMatchSnapshot(`player-test.png`, { threshold: 0.2 });
  });
});

