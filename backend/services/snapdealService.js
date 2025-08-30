// backend/services/snapdealService.js (Complete, Updated Selectors)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getSnapdealService(query) {
  const url = `https://www.snapdeal.com/search?keyword=${encodeURIComponent(query)}&sort=rlvncy`;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-http2'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // --- KEY CHANGE: New selector for the container of all products ---
    await page.waitForSelector('#products', { timeout: 20000 });

    const products = await page.evaluate(() => {
      const cards = document.querySelectorAll('.product-tuple-listing');
      const results = [];

      cards.forEach(card => {
        const title = card.querySelector('.product-title')?.innerText;
        const price = card.querySelector('.product-price')?.innerText;
        const imageElement = card.querySelector('img.product-image');
        const image = imageElement?.src || imageElement?.getAttribute('data-src') || '';
        const link = card.querySelector('a.dp-widget-link')?.href;

        if (title && price && link) {
          results.push({ title, price, image, platform: 'Snapdeal', url: link });
        }
      });
      return results;
    });

    console.log(`✅ Scraped Snapdeal Products: ${products.length} items found.`);
    await browser.close();
    return products;
  } catch (error) {
    console.error('🚨 Snapdeal scraping failed:', error.message);
    if (browser) await browser.close();
    return [];
  }
}

module.exports = { getSnapdealService };