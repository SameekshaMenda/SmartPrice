const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { detectLabelsFromImage } = require('../services/visionService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/detect-image', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const labels = await detectLabelsFromImage(req.file.buffer);
    console.log('Detected labels:', labels);
    res.json({ labels });
  } catch (err) {
    console.error('Vision API Error:', err);
    res.status(500).json({ error: 'Image recognition failed' });
  }
});

module.exports = router;
