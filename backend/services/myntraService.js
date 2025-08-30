// backend/services/myntraService.js

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getMyntraProducts(query) {
  // Myntra uses a path-based search, not a query parameter
  const formattedQuery = query.split(' ').join('-');
  const url = `https://www.myntra.com/${formattedQuery}`;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the main results container to be visible on the page
    await page.waitForSelector('ul.results-base', { timeout: 15000 });

    const products = await page.evaluate(() => {
      const results = [];
      // Select all the product list items
      const items = document.querySelectorAll('li.product-base');

      items.forEach(card => {
        // Myntra separates the brand from the product name, so we combine them
        const brand = card.querySelector('h3.product-brand')?.innerText;
        const productName = card.querySelector('h4.product-product')?.innerText;
        const title = brand && productName ? `${brand} - ${productName}` : (brand || productName);

        const price = card.querySelector('div.product-price span')?.innerText;
        // Myntra's images are often loaded dynamically, so we look for the main image tag
        const image = card.querySelector('img.img-responsive')?.src;
        const link = card.querySelector('a')?.href;

        if (title && price && image && link) {
          results.push({
            title,
            price,
            image,
            platform: 'Myntra',
            url: link // Myntra uses full URLs in their links
          });
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

