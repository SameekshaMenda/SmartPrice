// backend/services/tataCliqService.js

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getTataCliqProducts(query) {
  const url = `https://www.tatacliq.com/search/?searchCategory=all&text=${encodeURIComponent(query)}`;
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 15000 });

    const products = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('[data-testid="product-card"]').forEach(card => {
        const titleElement = card.querySelector('[data-testid="product-name"]');
        const priceElement = card.querySelector('[data-testid="product-price"]');
        const imageElement = card.querySelector('img');
        const linkElement = card.querySelector('a');
        
        if (titleElement && priceElement && imageElement && linkElement) {
          results.push({
            title: titleElement.innerText.trim(),
            price: priceElement.innerText.trim(),
            image: imageElement.src,
            platform: 'Tata CLiQ',
            url: linkElement.href
          });
        }
      });
      return results;
    });

    console.log(`✅ Scraped Tata CLiQ Products: ${products.length} items found.`);
    return products.slice(0, 10);
  } catch (error) {
    console.error('🚨 Tata CLiQ scraping failed:', error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { getTataCliqProducts };