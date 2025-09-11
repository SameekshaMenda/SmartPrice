const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getPantaloonsProducts(query) {
  const url = `https://www.pantaloons.com/search?q=${encodeURIComponent(query)}`;
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    await page.setViewport({ width: 1366, height: 768 });
    
    // Block unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    
    // Wait for either search results or no results message
    await Promise.race([
      page.waitForSelector('.product-list .product-item', { timeout: 10000 }),
      page.waitForSelector('.no-result', { timeout: 10000 })
    ]);

    const products = await page.evaluate(() => {
      const results = [];
      const items = document.querySelectorAll('.product-list .product-item');
      
      items.forEach(item => {
        try {
          const titleElem = item.querySelector('.product-name') || item.querySelector('.name');
          const priceElem = item.querySelector('.price') || item.querySelector('.product-price');
          const imageElem = item.querySelector('img');
          const linkElem = item.querySelector('a');
          
          if (titleElem && priceElem && imageElem && linkElem) {
            results.push({
              title: titleElem.innerText.trim(),
              price: priceElem.innerText.trim(),
              image: imageElem.src,
              platform: 'Pantaloons',
              url: linkElem.href
            });
          }
        } catch (e) {
          console.log('Error parsing product item');
        }
      });
      return results;
    });

    console.log(`✅ Scraped Pantaloons Products: ${products.length} items found.`);
    return products.slice(0, 8);
  } catch (error) {
    console.error('🚨 Pantaloons scraping failed:', error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { getPantaloonsProducts };