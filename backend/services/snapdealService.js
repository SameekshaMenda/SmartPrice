const puppeteer = require('puppeteer');

async function getSnapdealService(query) {
  const url = `https://www.snapdeal.com/search?keyword=${encodeURIComponent(query)}&sort=rlvncy`;

  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: null
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('.product-tuple-description', { timeout: 20000 });

    const products = await page.evaluate(() => {
      const cards = document.querySelectorAll('.product-tuple-listing');
      const results = [];

      cards.forEach(card => {
        const title = card.querySelector('.product-title')?.innerText;
        const price = card.querySelector('.product-price')?.innerText;
        const image = card.querySelector('img')?.src;
        const link = card.querySelector('a.dp-widget-link')?.href;

        if (title && price && link) {
          results.push({
            title,
            price,
            image,
            platform: 'Snapdeal',
            url: link
          });
        }
      });

      return results;
    });

    console.log('✅ Snapdeal Products:', products);
    await browser.close();
    return products;

  } catch (error) {
    console.error('🚨 Snapdeal scraping failed:', error);
    return [];
  }
}

module.exports = { getSnapdealService };
