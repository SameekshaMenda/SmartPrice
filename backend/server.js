const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const searchRoutes = require('./routes/search');
const imageSearchRoutes = require('./routes/imageSearch');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/search', searchRoutes);
app.use('/image', imageSearchRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
