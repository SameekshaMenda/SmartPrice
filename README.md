# SmartPrice
------------------------------
![smartPrice](https://github.com/user-attachments/assets/a4ca094b-c61e-447d-aa24-d170c109d1d8)


Components:

1. **Frontend (Client-Side)**
   - Built using React.js
   - Sends product name or uploaded image to backend
   - Displays price comparison results in a table
   - Optional: Login/Signup page

2. **Backend API Server (Node.js + Express)**
   - Exposes `/search` endpoint
   - Accepts product name or image
   - Coordinates with:
     a. eBay/Amazon API for product data
     b. Web scrapers (Flipkart, Meesho)
     c. Google Vision API (optional image to text)

3. **Web Scrapers (Puppeteer or Cheerio scripts)**
   - Separate modules/scripts that scrape price, title, rating from Flipkart, Meesho, etc.
   - Triggered by backend when needed

4. **Database (MongoDB Atlas)**
   - Stores user accounts (if auth enabled)
   - Saves product search history
   - Stores image-to-product mapping (optional)

5. **Image Hosting (Optional)**
   - Uses Firebase Storage or Cloudinary to store uploaded product images

6. **External APIs**
   - eBay API
   - Amazon Product Advertising API (if available)
   - Google Vision API (optional, image recognition)

7. **Deployment**
   - Frontend hosted on Vercel or Netlify
   - Backend hosted on Railway or Render

Connect all components logically using arrows. Show user flow:
User → Frontend → Backend → [APIs, Scrapers, Vision] → Response → Frontend UI.


