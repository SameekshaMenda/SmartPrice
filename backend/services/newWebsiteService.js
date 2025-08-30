// backend/services/newWebsiteService.js

const puppeteer = require('puppeteer');

async function getNewWebsiteService(query) {
  const url = `https://www.newwebsite.com/search?q=${encodeURIComponent(query)}`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // IMPORTANT: You must find the correct selectors for the new website
    await page.waitForSelector('.product-card-selector');

    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('.product-card-selector');
      const results = [];

      items.forEach(item => {
        const title = item.querySelector('.product-title-selector')?.innerText;
        const price = item.querySelector('.product-price-selector')?.innerText;
        const image = item.querySelector('.product-image-selector')?.src;
        const productUrl = item.querySelector('a')?.href;

        if (title && price && productUrl) {
          results.push({
            title,
            price,
            image,
            platform: 'NewWebsite', // Change this
            url: productUrl
          });
        }
      });
      return results;
    });

    await browser.close();
    return products;

  } catch (error) {
    console.error('🚨 NewWebsite scraping failed:', error);
    return [];
  }
}

module.exports = { getNewWebsiteService };