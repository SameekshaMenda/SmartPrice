// backend/services/urlScraperService.js (Complete, Corrected File)

const puppeteer = require('puppeteer');
// CORRECT PATHS: These files are in the same directory, so './' is correct here.
const { getAmazonService } = require('./amazonService');
const { getFlipkartProducts } = require('./flipkartService');
const { getSnapdealService } = require('./snapdealService'); // Let's add Snapdeal back in!

async function launchBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function scrapeInitialProductDetails(url) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  let productDetails = { url };

  try {
    if (url.includes('amazon')) {
      await page.waitForSelector('#productTitle', { timeout: 10000 });
      productDetails.title = await page.$eval('#productTitle', el => el.innerText.trim());
      productDetails.price = await page.$eval('.a-price-whole', el => el.innerText.trim());
      productDetails.platform = 'Amazon';
    } else if (url.includes('flipkart.com')) {
      await page.waitForSelector('.B_NuCI', { timeout: 10000 });
      productDetails.title = await page.$eval('.B_NuCI', el => el.innerText.trim());
      productDetails.price = await page.$eval('._30jeq3._16Jk6d', el => el.innerText.trim());
      productDetails.platform = 'Flipkart';
    } else {
      throw new Error('Unsupported website for initial scraping.');
    }
  } catch (error) {
    console.error(`Failed to scrape initial details from ${url}:`, error.message);
    throw new Error(`Could not extract product details from the URL.`);
  } finally {
    await browser.close();
  }

  console.log('✅ Scraped Initial Product:', productDetails);
  return productDetails;
}

async function searchByUrl(productTitle) {
  if (!productTitle) {
    throw new Error('Product title is required for searching.');
  }

  console.log(`✅ Searching for title: "${productTitle}"...`);

  // --- KEY FIX ---
  // We call all three services and correctly name the variables.
  const [flipkartResults, amazonResults, snapdealResults] = await Promise.all([
    getFlipkartProducts(productTitle),
    getAmazonService(productTitle),
    getSnapdealService(productTitle),
  ]);

  // Combine the results from all platforms into one array
  return [...flipkartResults, ...amazonResults, ...snapdealResults];
}

module.exports = { searchByUrl, scrapeInitialProductDetails };