const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const text = generateText("Max", 29);
  expect(text).toBe("Max (29 years old)");
  const text1 = generateText("Anna", 30);
  expect(text1).toBe("Anna (30 years old)");
});

test("should ountput empty name and age", () => {
  const text = generateText(" ", null);
  expect(text).toBe("  (null years old)");
});

test("should generate a valid text output", () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

// E2E testing with puppeteer
test("should create  an element with text and correct class", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920, 1080"],
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
  await page.click("input#name");
  await page.type("input#name", "Anna");
  await page.click("input#age");
  await page.type("input#age", "29");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Anna (29 years old)");
}, 10000);
