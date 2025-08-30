// backend/services/amazonService.js (Complete, Corrected File)

const axios = require('axios');

async function getAmazonService(query) {
  const url = 'https://real-time-amazon-data.p.rapidapi.com/search';

  const headers = {
    // IMPORTANT: It's better to load this from a .env file
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '5f57ac184emshac396b432d682fap1c8b54jsn296335dbef48',
    'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
  };

  const params = {
    query: query,
    page: '1',
    country: 'IN'
  };

  try {
    const response = await axios.get(url, { headers, params });
    const products = response.data?.data?.products || [];

    const formattedProducts = products.map(product => ({
      title: product.product_title || 'No title',
      // --- THE FIX IS HERE ---
      // The correct field is often product_photo. We check for both.
      image: product.product_photo || product.product_image || '',
      platform: 'Amazon',
      price: product.product_price || 'No price',
      url: product.product_url || 'No URL'
    }));

    console.log(`🛒 Scraped Amazon Products: ${formattedProducts.length} items found.`);
    return formattedProducts;

  } catch (error) {
    console.error('Error fetching from Amazon API:', error.message);
    return [];
  }
}

module.exports = { getAmazonService };