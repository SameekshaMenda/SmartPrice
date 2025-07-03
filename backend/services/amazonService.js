async function getMockAmazonProducts(query) {
  return [
    {
      title: `Mock Amazon Product for ${query}`,
      price: '₹59,999',
      platform: 'Amazon',
      url: 'https://www.amazon.in/mock-product',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: `${query} Ultra Edition`,
      price: '₹62,999',
      platform: 'Amazon',
      url: 'https://www.amazon.in/mock-product-2',
      image: 'https://via.placeholder.com/150'
    }
  ];
}

module.exports = { getMockAmazonProducts };
