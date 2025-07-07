const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//const searchRoutes = require('./routes/search');
const amazonRoutes = require('./routes/amazon');
const flipkartRoutes = require('./routes/flipkart');
const snapdealRoutes = require('./routes/snapdeal');
const cromaRoutes = require('./routes/croma');
const jiomartRoutes = require('./routes/meesho');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//app.use('/search', searchRoutes);
app.use('/amazon', amazonRoutes);
app.use('/flipkart', flipkartRoutes);
app.use('/snapdeal', snapdealRoutes);
app.use('/croma', cromaRoutes);
app.use('/meesho', jiomartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
