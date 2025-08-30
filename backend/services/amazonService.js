const axios = require('axios');

async function getAmazonService(query) {
  const url = 'https://real-time-amazon-data.p.rapidapi.com/search';
  
  const headers = {
    'X-RapidAPI-Key': '5f57ac184emshac396b432d682fap1c8b54jsn296335dbef48', // Store this in `.env` in production
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

    return products.map(product => ({
      title: product.product_title || 'No title',
      image: product.product_image || '',
      platform: 'Amazon',
      price: product.product_price || 'No price',
      url: product.product_url || 'No URL'
    }));
  } catch (error) {
    console.error('Error fetching from Amazon API:', error.message);
    return [];
  }
}

module.exports = { getAmazonService };
