import { test, expect } from "@playwright/test";

test.describe("Player", ()=>{
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test
    await page.goto("http://localhost:8080", { waitUntil: "domcontentloaded" });
  });

  test("is present", async ({ page }) => {
    const selector = "lottie-player";
    const element = await page.innerHTML(selector);
    expect(element).toBeDefined();
  });

  test("controls are present", async ({ page }) => {
    const selector = "div .controls";
    const element = await page.$$(selector);
    expect(element).toBeDefined();
  });

  test("seeker is present", async ({ page }) => {
    const selector = "input .seeker";
    const element = await page.$$(selector);
    expect(element).toBeDefined();
  });

  test("screenshot matches", async ({ page }) => {
    // wait for the page to load (could use some other signal?)
    await page.waitForTimeout(1000);

    const screenshot = await page.screenshot({fullPage: true});
    expect(screenshot).toMatchSnapshot(`player-test.png`, { threshold: 0.2 });
  });
});

