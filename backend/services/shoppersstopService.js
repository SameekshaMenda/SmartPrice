const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getShoppersStopProducts(query) {
  const url = `https://www.shoppersstop.com/search?q=${encodeURIComponent(query)}`;
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    // Try multiple selectors for products
    const products = await page.evaluate(() => {
      const results = [];
      const selectors = [
        '.prod-container li',
        '.product-item',
        '.product-grid-item',
        '.search-product'
      ];
      
      let items = [];
      selectors.forEach(selector => {
        const found = document.querySelectorAll(selector);
        if (found.length > 0) {
          items = Array.from(found);
        }
      });
      
      items.forEach(item => {
        try {
          const titleElem = item.querySelector('.prod-name, .product-name');
          const priceElem = item.querySelector('.prod-sp, .price');
          const imageElem = item.querySelector('img');
          const linkElem = item.querySelector('a');
          
          if (titleElem && priceElem) {
            results.push({
              title: titleElem.innerText.trim(),
              price: priceElem.innerText.trim(),
              image: imageElem ? imageElem.src : '',
              platform: 'Shoppers Stop',
              url: linkElem ? linkElem.href : ''
            });
          }
        } catch (e) {
          console.log('Error parsing product item');
        }
      });
      return results;
    });

    console.log(`✅ Scraped Shoppers Stop Products: ${products.length} items found.`);
    return products.slice(0, 8);
  } catch (error) {
    console.error('🚨 Shoppers Stop scraping failed:', error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { getShoppersStopProducts };