const express = require('express');
const router = express.Router();

const { getMockEbayProducts: getEbayProducts } = require('../services/ebayService');
const { getAmazonService } = require('../services/amazonService');
const { getFlipkartProducts } = require('../services/flipkartService');

router.get('/', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const [ebay, flipkart, amazon] = await Promise.all([
      getEbayProducts(query),
      getFlipkartProducts(query),
      getAmazonService(query)
    ]);

    const results = [...ebay, ...flipkart, ...amazon];
    console.log('✅ All results fetched');
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching product data:', err.message);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

module.exports = router;
