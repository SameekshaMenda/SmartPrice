// backend/services/flipkartService.js (Complete, More Robust Version)

const puppeteer = require('puppeteer');

async function getFlipkartProducts(query) {
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // This is a more reliable selector for the container of all search results
    await page.waitForSelector('div._1AtVbE', { timeout: 20000 });

    const products = await page.evaluate(() => {
      // Flipkart uses many different class names. We check for multiple possibilities.
      const items = document.querySelectorAll('div._1xHGtK._373qXS, div._4ddWXP, div._2kHMtA');
      const results = [];

      items.forEach(card => {
        const title = card.querySelector('a.s1Q9rs, ._4rR01T')?.innerText;
        const price = card.querySelector('div._30jeq3')?.innerText;
        const image = card.querySelector('img._396cs4')?.src;
        const relativeUrl = card.querySelector('a.s1Q9rs, a._1fQZEK')?.getAttribute('href');

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