// backend/routes/history.js (Complete, Final Debugging Version)

const express = require('express');
const router = express.Router();
const { db } = require('../firebaseAdmin');

// POST route to save a search result
router.post('/', async (req, res) => {
  const { userId, searchResult } = req.body;
  if (!userId || !searchResult) {
    return res.status(400).send('Missing userId or searchResult');
  }
  try {
    const historyRef = db.collection('users').doc(userId).collection('history');
    await historyRef.add({
      ...searchResult,
      timestamp: new Date()
    });
    res.status(201).send('History saved');
  } catch (error) {
    // --- THIS IS THE ONLY CHANGE ---
    // This will print the detailed Firebase error to your backend terminal
    console.error("🔥 Firestore Save Error:", error); 
    
    res.status(500).send('Error saving history: ' + error.message);
  }
});

// GET route to fetch search history
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const historyRef = db.collection('users').doc(userId).collection('history').orderBy('timestamp', 'desc');
    const snapshot = await historyRef.get();
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(history);
  } catch (error) {
    console.error("🔥 Firestore Fetch Error:", error);
    res.status(500).send('Error fetching history: ' + error.message);
  }
});

module.exports = router;