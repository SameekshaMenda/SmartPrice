// backend/services/myntraService.js (Complete, Updated Selectors)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getMyntraProducts(query) {
  const formattedQuery = query.split(' ').join('-');
  const url = `https://www.myntra.com/${formattedQuery}`;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-http2'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // --- KEY CHANGE: Updated selector for the main results container ---
    await page.waitForSelector('ul.results-base', { timeout: 20000 });

    const products = await page.evaluate(() => {
      const results = [];
      const items = document.querySelectorAll('li.product-base');

      items.forEach(card => {
        const brand = card.querySelector('h3.product-brand')?.innerText;
        const productName = card.querySelector('h4.product-product')?.innerText;
        const title = brand && productName ? `${brand} - ${productName}` : (brand || productName);
        const price = card.querySelector('.product-discountedPrice, .product-price')?.innerText;
        const image = card.querySelector('img.img-responsive')?.src;
        const link = card.querySelector('a')?.href;

        if (title && price && image && link) {
          results.push({ title, price, image, platform: 'Myntra', url: link });
        }
      });
      return results;
    });

    console.log(`✅ Scraped Myntra Products: ${products.length} items found.`);
    await browser.close();
    return products;
  } catch (error) {
    console.error('🚨 Myntra scraping failed:', error.message);
    if (browser) await browser.close();
    return [];
  }
}

module.exports = { getMyntraProducts };