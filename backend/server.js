// backend/server.js (Complete updated file)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import your routes
const searchRoutes = require('./routes/search');
const imageSearchRoutes = require('./routes/imageSearch');
const urlSearchRoutes = require('./routes/urlSearch'); // <-- Import the new route

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This is crucial for parsing req.body

// Define your API routes
app.use('/search', searchRoutes);
app.use('/image', imageSearchRoutes);
app.use('/url-search', urlSearchRoutes); // <-- Use the new route

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});