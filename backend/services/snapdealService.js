// backend/services/snapdealService.js (Complete, Corrected File)

const puppeteer = require('puppeteer');

async function getSnapdealService(query) {
  const url = `https://www.snapdeal.com/search?keyword=${encodeURIComponent(query)}&sort=rlvncy`;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('.product-tuple-listing', { timeout: 20000 });

    const products = await page.evaluate(() => {
      const cards = document.querySelectorAll('.product-tuple-listing');
      const results = [];

      cards.forEach(card => {
        const title = card.querySelector('.product-title')?.innerText;
        const price = card.querySelector('.product-price')?.innerText;
        const imgElement = card.querySelector('img.product-image, img.picture-elem');
        // --- THE FIX IS HERE ---
        // Get 'data-src' first, as images are often lazy-loaded, then fall back to 'src'.
        const image = imgElement?.getAttribute('data-src') || imgElement?.src || '';
        const link = card.querySelector('a.dp-widget-link')?.href;

        if (title && price && link) {
          results.push({ title, price, image, platform: 'Snapdeal', url: link });
        }
      });
      return results;
    });

    console.log(`✅ Snapdeal Products: ${products.length} items found.`);
    await browser.close();
    return products;

  } catch (error) {
    console.error('🚨 Snapdeal scraping failed:', error.message);
    if (browser) await browser.close();
    return [];
  }
}

module.exports = { getSnapdealService };