const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getNykaaProducts(query) {
  const url = `https://www.nykaa.com/search/result/?q=${encodeURIComponent(query)}`;
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
    
    const products = await page.evaluate(() => {
      const results = [];
      const items = document.querySelectorAll('.product-grid, .listing-container, .product-list');
      
      items.forEach(container => {
        const products = container.querySelectorAll('.product-card, .product-item');
        products.forEach(item => {
          try {
            const titleElem = item.querySelector('.product-name, .title, [data-product-name]');
            const priceElem = item.querySelector('.product-price, .price, [data-price]');
            const imageElem = item.querySelector('img');
            const linkElem = item.querySelector('a');
            
            if (titleElem && priceElem) {
              results.push({
                title: titleElem.innerText.trim(),
                price: priceElem.innerText.trim(),
                image: imageElem ? imageElem.src : '',
                platform: 'Nykaa',
                url: linkElem ? linkElem.href : ''
              });
            }
          } catch (e) {}
        });
      });
      return results;
    });

    console.log(`✅ Scraped Nykaa Products: ${products.length} items found.`);
    return products.slice(0, 8);
  } catch (error) {
    console.error('🚨 Nykaa scraping failed:', error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { getNykaaProducts };