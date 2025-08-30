// backend/routes/urlSearch.js (Complete, Verified File)

const express = require('express');
const router = express.Router(); // Make sure this line exists
const { searchByUrl, scrapeInitialProductDetails } = require('../services/urlScraperService');

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const originalProduct = await scrapeInitialProductDetails(url);
    if (originalProduct.error || !originalProduct.title) {
      return res.status(500).json({ error: originalProduct.error || 'Failed to extract product title.' });
    }

    const allCandidates = await searchByUrl(originalProduct.title);
    const exactMatches = rankAndFilterResults(originalProduct, allCandidates);

    console.log(`✅ Found ${exactMatches.length} high-confidence matches.`);
    res.json(exactMatches);
  } catch (err) {
    console.error('❌ Error in URL search route:', err.message);
    res.status(500).json({ error: 'Failed to fetch product data using URL.' });
  }
});

function rankAndFilterResults(originalProduct, allCandidates) {
  const originalTitleWords = new Set(
    originalProduct.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').filter(Boolean)
  );

  const scoredMatches = [];
  scoredMatches.push({ ...originalProduct, score: 2 }); // Always include the original

  if (!Array.isArray(allCandidates)) return scoredMatches;

  allCandidates.forEach(candidate => {
    if (candidate && candidate.title && candidate.url !== originalProduct.url) {
      const candidateTitleWords = new Set(
        candidate.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').filter(Boolean)
      );
      let matchCount = 0;
      for (const word of originalTitleWords) {
        if (candidateTitleWords.has(word)) matchCount++;
      }
      const matchScore = matchCount / originalTitleWords.size;
      if (matchScore >= 0.70) {
        scoredMatches.push({ ...candidate, score: matchScore });
      }
    }
  });

  const uniqueMatches = Array.from(new Map(scoredMatches.map(item => [item.url, item])).values());
  return uniqueMatches.sort((a, b) => b.score - a.score);
}

// --- THIS LINE IS CRITICAL ---
module.exports = router; // If this line is missing or wrong, you will get the error.