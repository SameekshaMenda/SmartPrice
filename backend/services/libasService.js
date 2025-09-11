const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function getLibasProducts(query) {
  const url = `https://www.libas.in/search?q=${encodeURIComponent(query)}&type=product`;
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

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    // Wait for search results or no results
    await Promise.race([
      page.waitForSelector('.grid__item, .product-item, .product-card', { timeout: 10000 }),
      page.waitForSelector('.search-empty, .no-results', { timeout: 10000 })
    ]);

    const products = await page.evaluate(() => {
      const results = [];
      
      // Try multiple selectors for product items
      const productSelectors = [
        '.grid__item',
        '.product-item',
        '.product-card',
        '.search-result-item',
        '.collection-item'
      ];
      
      let items = [];
      productSelectors.forEach(selector => {
        const found = document.querySelectorAll(selector);
        if (found.length > 0) {
          items = Array.from(found);
        }
      });
      
      items.forEach(item => {
        try {
          // Multiple selectors for each element
          const titleSelectors = [
            '.card__heading',
            '.product-item__title',
            '.product-title',
            '.title',
            'h3',
            'h4'
          ];
          
          const priceSelectors = [
            '.price-item',
            '.price',
            '.product-price',
            '.money',
            '.price__regular'
          ];
          
          let title = '';
          let price = '';
          let image = '';
          let url = '';
          
          // Find title
          for (const selector of titleSelectors) {
            const element = item.querySelector(selector);
            if (element && element.innerText) {
              title = element.innerText.trim();
              break;
            }
          }
          
          // Find price
          for (const selector of priceSelectors) {
            const element = item.querySelector(selector);
            if (element && element.innerText) {
              price = element.innerText.trim();
              break;
            }
          }
          
          // Find image
          const imgElement = item.querySelector('img');
          if (imgElement) {
            image = imgElement.src || imgElement.getAttribute('data-src') || '';
          }
          
          // Find URL
          const linkElement = item.querySelector('a');
          if (linkElement) {
            url = linkElement.href;
            if (url && !url.startsWith('http')) {
              url = `https://www.libas.in${url}`;
            }
          }
          
          if (title && price) {
            results.push({
              title,
              price,
              image: image || '',
              platform: 'Libas',
              url: url || ''
            });
          }
        } catch (e) {
          console.log('Error parsing product item');
        }
      });
      return results;
    });

    console.log(`✅ Scraped Libas Products: ${products.length} items found.`);
    return products.slice(0, 8);
  } catch (error) {
    console.error('🚨 Libas scraping failed:', error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { getLibasProducts };