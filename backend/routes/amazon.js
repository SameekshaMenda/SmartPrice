const express = require('express');
const router = express.Router();
const { getAmazonService } = require('../services/amazonService'); // adjust path if different

// Example: GET /amazon?q=iphone
router.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const results = await getAmazonService(query);
    res.json(results);
  } catch (error) {
    console.error('Amazon route error:', error.message);
    res.status(500).json({ error: 'Failed to fetch from Amazon' });
  }
});

module.exports = router;
