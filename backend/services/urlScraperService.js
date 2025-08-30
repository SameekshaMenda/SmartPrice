// backend/services/urlScraperService.js (Complete, Corrected Nykaa Image Selector)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const { getAmazonService } = require('./amazonService');
const { getMyntraProducts } = require('./myntraService');
const { getNykaaProducts } = require('./nykaaService');

async function launchBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-http2'],
  });
}

async function scrapeInitialProductDetails(url) {
  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    let productDetails = { url };

    if (url.includes('myntra.com')) {
      // (Myntra logic is correct and remains the same)
      await page.waitForSelector('.pdp-title', { timeout: 15000 });
      const brand = await page.$eval('.pdp-title', el => el.innerText.trim());
      const name = await page.$eval('.pdp-name', el => el.innerText.trim());
      productDetails.title = `${brand} ${name}`;
      productDetails.price = await page.$eval('.pdp-discount-container .pdp-price, .pdp-price strong', el => el.innerText.trim().split('₹')[1]);
      productDetails.price = `₹${productDetails.price}`;
      productDetails.image = await page.$eval('.image-grid-image', el => el.style.backgroundImage.slice(4, -1).replace(/"/g, ""));
      productDetails.platform = 'Myntra';

    } else if (url.includes('amazon')) {
      // (Amazon logic is correct and remains the same)
      await page.waitForSelector('#productTitle', { timeout: 10000 });
      productDetails.title = await page.$eval('#productTitle', el => el.innerText.trim());
      productDetails.price = await page.$eval('.a-price-whole', el => el.innerText.trim());
      productDetails.image = await page.$eval('#landingImage', el => el.src);
      productDetails.platform = 'Amazon';

    } else if (url.includes('nykaa.com')) {
      // --- LOGIC FOR NYKAA PRODUCT PAGES ---
      await page.waitForSelector('.css-1gc4x7i', { timeout: 15000 }); // Wait for title
      productDetails.title = await page.$eval('.css-1gc4x7i', el => el.innerText.trim());
      productDetails.price = await page.$eval('.css-1jczs19', el => el.innerText.trim().split('₹')[1]);
      productDetails.price = `₹${productDetails.price}`;
      productDetails.platform = 'Nykaa';

      // --- KEY FIX: Wait for the image specifically and use the correct selector ---
      // The selector should be 'img.css-11gn9r6' (an img tag WITH the class)
      await page.waitForSelector('img.css-11gn9r6', { timeout: 10000 });
      productDetails.image = await page.$eval('img.css-11gn9r6', el => el.src);

    } else {
      throw new Error('Unsupported website for initial scraping.');
    }

    console.log('✅ Scraped Initial Product:', productDetails);
    return productDetails;
  } catch (error) {
    console.error(`🚨 Failed to scrape initial details from ${url}:`, error.message);
    return { error: `Could not scrape the initial URL. The website might be protected or its layout has changed.`, title: null };
  } finally {
    if (browser) await browser.close();
  }
}

async function searchByUrl(productTitle) {
  // (This function remains the same)
  if (!productTitle) throw new Error('Product title required.');
  console.log(`✅ Searching for title: "${productTitle}"...`);

  const [amazonResults, myntraResults, nykaaResults] = await Promise.all([
    getAmazonService(productTitle),
    getMyntraProducts(productTitle),
    getNykaaProducts(productTitle),
  ]);
  return [...amazonResults, ...myntraResults, ...nykaaResults];
}

module.exports = { searchByUrl, scrapeInitialProductDetails };