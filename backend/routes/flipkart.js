const express = require('express');
const router = express.Router();
const { getFlipkartService } = require('../services/flipkartService');

router.get('/', async (req, res) => {
  const query = req.query.q || 'iphone 13';

  try {
    const data = await getFlipkartService(query);
    res.json(data);
  } catch (err) {
    console.error('Flipkart fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch from Flipkart' });
  }
});

module.exports = router;
