// backend/services/flipkartService.js (Complete, Updated Selectors)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getFlipkartProducts(query) {
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-http2'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // --- KEY CHANGE: New selector for the container ---
    await page.waitForSelector('div._1YokD2._3Mn1Gg', { timeout: 20000 });

    const products = await page.evaluate(() => {
      // --- KEY CHANGE: New selector for the individual items ---
      const items = document.querySelectorAll('div._4ddWXP, div._2kHMtA');
      const results = [];

      items.forEach(card => {
        const title = card.querySelector('.s1Q9rs, ._4rR01T')?.innerText;
        const price = card.querySelector('._30jeq3')?.innerText;
        const image = card.querySelector('img._396cs4')?.src;
        const relativeUrl = card.querySelector('a.s1Q9rs, a._1fQZEK')?.getAttribute('href');

        if (title && price && image && relativeUrl) {
          results.push({
            title, price, image, platform: 'Flipkart', url: 'https://www.flipkart.com' + relativeUrl
          });
        }
      });
      return results;
    });

    console.log(`✅ Scraped Flipkart Products: ${products.length} items found.`);
    await browser.close();
    return products;
  } catch (error) {
    console.error('🚨 Flipkart scraping failed:', error.message);
    if (browser) await browser.close();
    return [];
  }
}

module.exports = { getFlipkartProducts };