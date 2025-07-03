const express = require('express');
const router = express.Router();

// const { getEbayProducts } = require('../services/ebayService');
const { getMockEbayProducts: getEbayProducts } = require('../services/ebayService');

const { getMockAmazonProducts } = require('../services/amazonService');
const { getFlipkartProducts } = require('../services/flipkartService');

router.get('/', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const [ebay, flipkart, amazon] = await Promise.all([
      getEbayProducts(query),
      getFlipkartProducts(query),
      getMockAmazonProducts(query)
    ]);

    const results = [...ebay, ...flipkart, ...amazon];
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});


router.get('/', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const flipkart = await getFlipkartProducts(query);
    console.log('✅ Flipkart Results:', flipkart);
    res.json(flipkart);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Flipkart scraping failed' });
  }
});

module.exports = router;
