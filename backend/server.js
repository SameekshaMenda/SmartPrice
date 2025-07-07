const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
<<<<<<< HEAD

//const searchRoutes = require('./routes/search');
const amazonRoutes = require('./routes/amazon');
const flipkartRoutes = require('./routes/flipkart');
const snapdealRoutes = require('./routes/snapdeal');
const cromaRoutes = require('./routes/croma');
const jiomartRoutes = require('./routes/meesho');
=======
const searchRoutes = require('./routes/search');
const imageSearchRoutes = require('./routes/imageSearch');

>>>>>>> afdbc342b3bc1321253f8fd637b01cc02f68737d

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
//app.use('/search', searchRoutes);
app.use('/amazon', amazonRoutes);
app.use('/flipkart', flipkartRoutes);
app.use('/snapdeal', snapdealRoutes);
app.use('/croma', cromaRoutes);
app.use('/meesho', jiomartRoutes);
=======
app.use('/search', searchRoutes);
app.use('/image', imageSearchRoutes);

>>>>>>> afdbc342b3bc1321253f8fd637b01cc02f68737d

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
