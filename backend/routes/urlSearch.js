// backend/routes/urlSearch.js (Complete, Final Version with Smart Filtering)

const express = require('express');
const router = express.Router();
const { searchByUrl, scrapeInitialProductDetails } = require('../services/urlScraperService');

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // 1. Get the authoritative details of the product from the original URL
    const originalProduct = await scrapeInitialProductDetails(url);

    // 2. Search for that product's title on all platforms to get candidates
    const allCandidates = await searchByUrl(originalProduct.title);

    // 3. Filter the candidates to find only exact matches
    const exactMatches = rankAndFilterResults(originalProduct, allCandidates);

    console.log(`✅ Found ${exactMatches.length} high-confidence matches.`);
    res.json(exactMatches);

  } catch (err) {
    console.error('❌ Error in URL search route:', err.message);
    res.status(500).json({ error: 'Failed to fetch product data using URL.' });
  }
});

/**
 * A smart filter that compares each candidate product to the original product.
 * It only returns candidates that are a very close match.
 * @param {object} originalProduct - The product from the initial URL.
 * @param {Array} allCandidates - The array of all search results.
 * @returns {Array} - A short, sorted array of high-confidence matches.
 */
function rankAndFilterResults(originalProduct, allCandidates) {
  // Create a set of unique, lowercase keywords from the original title for efficient lookup.
  const originalTitleWords = new Set(
    originalProduct.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').filter(Boolean)
  );

  const scoredMatches = [];

  allCandidates.forEach(candidate => {
    const candidateTitleWords = new Set(
      candidate.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').filter(Boolean)
    );

    let matchCount = 0;
    // Count how many of the original keywords are present in the candidate's title
    for (const word of originalTitleWords) {
      if (candidateTitleWords.has(word)) {
        matchCount++;
      }
    }

    // Calculate a match score as a percentage
    const matchScore = matchCount / originalTitleWords.size;

    // --- THIS IS THE CRITICAL THRESHOLD ---
    // Only consider products that have at least a 75% keyword match.
    // You can make this higher (e.g., 0.85) for even more strictness.
    if (matchScore >= 0.75) {
      scoredMatches.push({ ...candidate, score: matchScore });
    }
  });

  // Sort the high-confidence matches by their score, descending
  return scoredMatches.sort((a, b) => b.score - a.score);
}

module.exports = router;