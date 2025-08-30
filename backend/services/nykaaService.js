// backend/services/nykaaService.js (Complete, Updated Selectors)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getNykaaProducts(query) {
  const url = `https://www.nykaa.com/search/result/?q=${encodeURIComponent(query)}`;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // --- KEY FIX: Updated selector for the main container of products ---
    await page.waitForSelector('div#product-list-wrap', { timeout: 20000 });

    const products = await page.evaluate(() => {
      const results = [];
      // --- KEY FIX: Updated selector for individual product cards ---
      const items = document.querySelectorAll('div.css-d5z3ro');

      items.forEach(card => {
        // --- KEY FIX: Updated selectors for elements within the card ---
        const title = card.querySelector('div.css-10zjw4o')?.innerText;
        const price = card.querySelector('span.css-111z9ua')?.innerText;
        const image = card.querySelector('img.css-11gn9r6')?.src;
        const link = card.querySelector('a.css-qlopj4')?.href;

        if (title && price && image && link) {
          results.push({ title, price, image, platform: 'Nykaa', url: link });
        }
      });
      return results;
    });

    console.log(`✅ Scraped Nykaa Products: ${products.length} items found.`);
    await browser.close();
    return products;

  } catch (error) {
    console.error('🚨 Nykaa scraping failed:', error.message);
    if (browser) await browser.close();
    return [];
  }
}

module.exports = { getNykaaProducts };