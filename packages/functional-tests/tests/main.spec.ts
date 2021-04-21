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
    const selector = ".controls";
    const element = await page.$$(selector);
    expect(element.length).toBeGreaterThan(0);
  });

  test("seeker is present", async ({ page }) => {
    const selector = ".seeker";
    const element = await page.$$(selector);
    expect(element.length).toBeGreaterThan(0);
  });

  test("all 3 buttons are present", async ({ page }) => {
    const selector = ".toolbar button";
    const element = await page.$$(selector);
    expect(element.length).toEqual(3);
  });

  test("first button (Play) event listener fired", async ({ page }) => {
    //Click the play button
    const selector = ".toolbar button";
    const element = await page.$$(selector);
    await element[0].click();

    var isPaused = await page.evaluate('document.querySelector("lottie-player").getLottie().isPaused');
    expect(isPaused).toEqual(false);
  });

  test("first button (Pause) event listener fired", async ({ page }) => {
    //Click the play, then pause button
    const selector = ".toolbar button";
    const element = await page.$$(selector);
    await element[0].click();
    await element[0].click();

    var isPaused = await page.evaluate('document.querySelector("lottie-player").getLottie().isPaused');
    expect(isPaused).toEqual(true);
  });

  test("second button (Stop) event listener fired", async ({ page }) => {
    //Click the play button, then the stop button
    const selector = ".toolbar button";
    const element = await page.$$(selector);
    await element[0].click();
    await element[1].click();

    var isPaused = await page.evaluate('document.querySelector("lottie-player").getLottie().isPaused');
    expect(isPaused).toEqual(true);
  });

  test("screenshot matches", async ({ page }) => {
    // wait for the page to load (could use some other signal?)
    await page.waitForTimeout(1000);

    const screenshot = await page.screenshot({fullPage: true});
    expect(screenshot).toMatchSnapshot(`player-test.png`, { threshold: 0.2 });
  });
});
