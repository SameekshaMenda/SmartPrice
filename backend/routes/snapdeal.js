const express = require('express');
const router = express.Router();
const { getSnapdealService } = require('../services/snapdealService');

router.get('/', async (req, res) => {
  const query = req.query.q || 'iphone';

  try {
    const data = await getSnapdealService(query);
    res.json(data);
  } catch (err) {
    console.error('Snapdeal fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch from Snapdeal' });
  }
});

module.exports = router;
