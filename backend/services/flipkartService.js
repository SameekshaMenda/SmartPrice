// backend/services/flipkartService.js (Complete, Final Upgraded Version)

// --- KEY CHANGE: Use puppeteer-extra and the stealth plugin ---
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getFlipkartProducts(query) {
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true, // It's better to run headless for performance once it's working
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // --- KEY CHANGE: Updated, more reliable selector for the results container ---
    // This waits for the main container that holds all the product cards.
    await page.waitForSelector('div._1YokD2._3Mn1Gg', { timeout: 20000 });

    const products = await page.evaluate(() => {
      // --- KEY CHANGE: These are the latest selectors for Flipkart's search page ---
      const items = document.querySelectorAll('div._1AtVbE div._13oc-S > div');
      const results = [];

      items.forEach(card => {
        const title = card.querySelector('div._4rR01T')?.innerText;
        const price = card.querySelector('div._30jeq3._1_WHN1')?.innerText;
        const image = card.querySelector('img._396cs4')?.src;
        const relativeUrl = card.querySelector('a._1fQZEK')?.getAttribute('href');

        if (title && price && image && relativeUrl) {
          results.push({
            title,
            price,
            image,
            platform: 'Flipkart',
            url: 'https://www.flipkart.com' + relativeUrl
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
    return []; // Always return an empty array on failure
  }
}

module.exports = { getFlipkartProducts };