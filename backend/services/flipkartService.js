const puppeteer = require('puppeteer');

async function getFlipkartService(query) {
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;

  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for products to load
    await page.waitForSelector('a.CGtC98', { timeout: 10000 });

    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('a.CGtC98');
      const results = [];

      items.forEach(card => {
        const title = card.querySelector('.KzDlHZ')?.innerText;
        const price = card.querySelector('.Nx9bqj._4b5DiR')?.innerText;
        const image = card.querySelector('img.DByuf4')?.src;
        const relativeUrl = card.getAttribute('href');

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

    console.log('✅ Scraped Products:', products);
    await browser.close();
    return products;

  } catch (error) {
    console.error('🚨 Flipkart scraping failed:', error);
    return [];
  }
}

module.exports = { getFlipkartService };
