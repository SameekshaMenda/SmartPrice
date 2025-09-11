// backend/services/urlScraperService.js (Updated Version)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const { getAmazonService } = require('./amazonService');
const { getMyntraProducts } = require('./myntraService');
const { getNykaaProducts } = require('./nykaaService');
const { getLibasProducts } = require('./libasService');
const { getPantaloonsProducts } = require('./pantaloonsService');
const { getUrbanicProducts } = require('./urbanicService');
const { getWestsideProducts } = require('./westsideService');
const { getShoppersStopProducts } = require('./shoppersstopService');
const { getAjioProducts } = require('./ajioService');
const { getTataCliqProducts } = require('./tataCliqService');

async function launchBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-http2',
      '--disable-features=site-per-process',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ],
  });
}

async function scrapeInitialProductDetails(url) {
  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    
    // Set user agent and viewport
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setViewport({ width: 1366, height: 768 });
    
    // Block unnecessary resources to speed up loading
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    const waitUntil = 'domcontentloaded';
    await page.goto(url, { waitUntil: waitUntil, timeout: 45000 });

    let productDetails = { url };

    if (url.includes('amazon')) {
      await page.waitForSelector('#centerCol', { timeout: 15000 });
      productDetails.title = await page.$eval('#productTitle, h1.a-size-large', el => el.innerText.trim());
      const priceSelectors = ['.a-price-whole', 'span[data-a-size="xl"] .a-price-whole', '#corePrice_feature_div .a-price-whole'];
      let price = await page.$eval(priceSelectors.join(', '), el => el.innerText.trim().replace(/[,.]/g, ''));
      productDetails.price = `₹${price}`;
      const imageSelectors = ['#landingImage', '#imgBlkFront', '#main-image-container img'];
      productDetails.image = await page.$eval(imageSelectors.join(', '), el => el.src);
      productDetails.platform = 'Amazon';
    } else if (url.includes('myntra.com')) {
      await page.waitForSelector('.pdp-title', { timeout: 15000 });
      const brand = await page.$eval('.pdp-title', el => el.innerText.trim());
      const name = await page.$eval('.pdp-name', el => el.innerText.trim());
      productDetails.title = `${brand} ${name}`;
      let price = await page.$eval('.pdp-price strong', el => el.innerText.trim().replace('₹', ''));
      productDetails.price = `₹${price}`;
      productDetails.image = await page.$eval('.image-grid-image', el => el.style.backgroundImage.slice(4, -1).replace(/"/g, ""));
      productDetails.platform = 'Myntra';
    } else if (url.includes('nykaa.com')) {
      await page.waitForSelector('.css-1gc4x7i', { timeout: 15000 });
      productDetails.title = await page.$eval('.css-1gc4x7i', el => el.innerText.trim());
      let price = await page.$eval('.css-1jczs19', el => el.innerText.trim().replace('₹', ''));
      productDetails.price = `₹${price}`;
      await page.waitForSelector('img.css-11gn9r6', { timeout: 10000 });
      productDetails.image = await page.$eval('img.css-11gn9r6', el => el.src);
      productDetails.platform = 'Nykaa';
    } else if (url.includes('westside.com')) {
      // --- CORRECTED WESTSIDE SCRAPING LOGIC ---
      try {
        // Wait for the page to load completely
        await page.waitForSelector('body', { timeout: 30000 });
        
        // Use page.evaluate to scrape data with multiple fallback options
        const westsideData = await page.evaluate(() => {
          // Try multiple title selectors
          const titleSelectors = [
            'h1.pdp-title',
            'h1.product-title',
            'h1.product-name',
            '.product-title',
            '[data-product-title]',
            'title'
          ];
          
          let title = '';
          for (const selector of titleSelectors) {
            const element = document.querySelector(selector);
            if (element && element.innerText && element.innerText.trim()) {
              title = element.innerText.trim();
              break;
            }
          }
          
          // Try multiple price selectors
          const priceSelectors = [
            'span.prod-sp',
            '.product-price',
            '.price-sales',
            '.price-final',
            '[data-product-price]',
            '.price-item',
            '.price'
          ];
          
          let price = '';
          for (const selector of priceSelectors) {
            const element = document.querySelector(selector);
            if (element && element.innerText && element.innerText.trim()) {
              price = element.innerText.trim();
              break;
            }
          }
          
          // Try multiple image selectors
          const imageSelectors = [
            '.slick-active img',
            '.product-image img',
            '.main-image img',
            'img.product-image',
            '[data-product-image]',
            'meta[property="og:image"]',
            'img[src*="westside"]'
          ];
          
          let image = '';
          for (const selector of imageSelectors) {
            const element = document.querySelector(selector);
            if (element) {
              image = element.src || element.content;
              if (image) break;
            }
          }
          
          return { title, price, image };
        });
        
        productDetails.title = westsideData.title;
        productDetails.price = westsideData.price;
        productDetails.image = westsideData.image;
        productDetails.platform = 'Westside';
        
        if (!productDetails.title) {
          throw new Error('Could not extract product details from Westside');
        }
        
      } catch (error) {
        console.error('Westside scraping failed:', error);
        throw error;
      }
    } else if (url.includes('libas.in')) {
  try {
    await page.waitForSelector('body', { timeout: 20000 });
    
    const libasData = await page.evaluate(() => {
      // SPECIFIC TITLE SELECTOR FOR LIBAS
      const titleSelectors = [
        'h1.ProductMeta__Title', // Most specific
        'h1.product__title',
        '.product-title h1',
        'h1[itemprop="name"]',
        'h1'
      ];
      
      let title = '';
      for (const selector of titleSelectors) {
        const element = document.querySelector(selector);
        if (element && element.innerText && element.innerText.trim()) {
          title = element.innerText.trim();
          // Clean up the title - remove extra text
          title = title.split('\n')[0].trim(); // Take only first line
          break;
        }
      }
      
      // PRICE SELECTORS
      const priceSelectors = [
        '.ProductMeta__PriceList .Price',
        '.price-item--regular',
        '.product__price',
        '[data-product-price]',
        '.money'
      ];
      
      let price = '';
      for (const selector of priceSelectors) {
        const element = document.querySelector(selector);
        if (element && element.innerText && element.innerText.trim()) {
          price = element.innerText.trim();
          // Extract just the price number
          const priceMatch = price.match(/₹[\d,]+/);
          if (priceMatch) price = priceMatch[0];
          break;
        }
      }
      
      // IMAGE SELECTORS
      const imageSelectors = [
        '.Product__Slideshow img',
        '.product-gallery__image img',
        'img.ProductMeta__Image',
        'img[data-product-image]'
      ];
      
      let image = '';
      for (const selector of imageSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          image = element.src || element.getAttribute('data-src');
          if (image) break;
        }
      }
      
      return { title, price, image };
    });
    
    productDetails.title = libasData.title || 'Libas Product';
    productDetails.price = libasData.price || 'Price not available';
    
    if (libasData.image) {
      productDetails.image = libasData.image.startsWith('http') ? 
        libasData.image : 
        `https://www.libas.in${libasData.image}`;
    }
    
    productDetails.platform = 'Libas';
    
  } catch (error) {
    console.error('Libas scraping failed:', error);
    throw error;
  }
} else if (url.includes('pantaloons.com')) {
      await page.waitForSelector('.pdp-title', { timeout: 15000 });
      productDetails.title = await page.$eval('.pdp-title', el => el.innerText.trim());
      let price = await page.$eval('.pdp-price-info .pdp-price', el => el.innerText.trim().replace('₹', ''));
      productDetails.price = `₹${price}`;
      productDetails.image = await page.$eval('.slick-active img', el => el.src);
      productDetails.platform = 'Pantaloons';
    } else if (url.includes('shoppersstop.com')) {
      await page.waitForSelector('h1.prod-title', { timeout: 15000 });
      productDetails.title = await page.$eval('h1.prod-title', el => el.innerText.trim());
      productDetails.price = await page.$eval('.prod-sp', el => el.innerText.trim());
      productDetails.image = await page.$eval('#big-img', el => el.src);
      productDetails.platform = 'Shoppers Stop';
    }else if (url.includes('ajio.com')) {
      await page.waitForSelector('.prod-name', { timeout: 20000 });
      productDetails.title = await page.$eval('.prod-name', el => el.innerText.trim());
      productDetails.price = await page.$eval('.price', el => el.innerText.trim());
      productDetails.image = await page.$eval('.img-container img', el => el.src);
      productDetails.platform = 'Ajio';
    } else if (url.includes('tatacliq.com')) {
      await page.waitForSelector('.ProductDetailsMainSection__productName', { timeout: 20000 });
      productDetails.title = await page.$eval('.ProductDetailsMainSection__productName', el => el.innerText.trim());
      productDetails.price = await page.$eval('.ProductDetailsMainSection__price', el => el.innerText.trim());
      productDetails.image = await page.$eval('.ProductImageZoom__image', el => el.src);
      productDetails.platform = 'Tata CLiQ';
    } else {
      throw new Error('Unsupported website for initial scraping.');
    }

    console.log('✅ Scraped Initial Product:', productDetails);
    return productDetails;
  } catch (error) {
    console.error(`🚨 Failed to scrape initial details from ${url}:`, error.message);
    return { error: `Could not scrape the initial URL.`, title: null };
  } finally {
    if (browser) await browser.close();
  }
}

async function searchByUrl(productTitle) {
  if (!productTitle) throw new Error('Product title required.');
  
  // Clean the title for search - take only the actual product name
  const cleanTitle = productTitle.split('\n')
    .find(line => line.trim() && !line.includes('Close') && !line.includes('Home'))
    ?.trim() || productTitle.split('\n')[0]?.trim() || productTitle;
  
  console.log(`✅ Searching for title: "${cleanTitle}"...`);
  
  const withTimeout = (promise, timeout) => {
    return Promise.race([
      promise,
      new Promise((resolve) => setTimeout(() => {
        console.log('⏰ Timeout reached for a service');
        resolve([]);
      }, timeout))
    ]);
  };

  const results = await Promise.allSettled([
    withTimeout(getAmazonService(cleanTitle), 20000),
    withTimeout(getMyntraProducts(cleanTitle), 15000),
    withTimeout(getNykaaProducts(cleanTitle), 15000),
    withTimeout(getLibasProducts(cleanTitle), 15000),
    withTimeout(getPantaloonsProducts(cleanTitle), 15000),
    withTimeout(getUrbanicProducts(cleanTitle), 15000),
    withTimeout(getWestsideProducts(cleanTitle), 15000),
    withTimeout(getShoppersStopProducts(cleanTitle), 15000),
    withTimeout(getAjioProducts(cleanTitle), 15000),
    withTimeout(getTataCliqProducts(cleanTitle), 15000)
  ]);

  const successfulResults = results
    .filter(result => result.status === 'fulfilled' && result.value.length > 0)
    .map(result => result.value);

  return successfulResults.flat();
}

module.exports = { searchByUrl, scrapeInitialProductDetails };