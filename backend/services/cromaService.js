const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getCromaProducts(query) {
  const url = `https://www.croma.com/searchB?q=${encodeURIComponent(query)}%3Arelevance`;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Scroll to trigger lazy load
    await autoScroll(page);

    // Updated selector for Croma product cards
    await page.waitForSelector('.product-item', { timeout: 30000 });

    const products = await page.evaluate(() => {
      const results = [];
      const items = document.querySelectorAll('.product-item');

      items.forEach(card => {
        const title = card.querySelector('.product-title a')?.innerText?.trim();
        const price = card.querySelector('.new-price')?.innerText?.trim()
                   || card.querySelector('.amount')?.innerText?.trim();
        const image = card.querySelector('img')?.src || '';
        const link = card.querySelector('a')?.href || '';

        if (title && price && image && link) {
          results.push({ title, price, image, platform: 'Croma', url: link });
        }
      });
      return results;
    });

    console.log(`✅ Scraped Croma Products: ${products.length} items found.`);
    return products;

  } catch (error) {
    console.error('🚨 Croma scraping failed:', error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

// 🔧 Puppeteer v4+ compatible scroll
async function autoScroll(page) {
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

module.exports = { getCromaProducts };
