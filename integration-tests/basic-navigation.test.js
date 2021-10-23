const portfinder = require("portfinder");
const puppeteer = require("puppeteer");

const app = require("../meadowlark");
let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

test("home page links to about page", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    page.waitForNavigation(), // expect navigation, wait for it to resolve
    page.click("[data-test-id='about']")
  ]);

  expect(page.url()).toBe(`http://localhost:${port}/about`);
  browser.close();
});

afterEach(() => {
  server.close();
});
