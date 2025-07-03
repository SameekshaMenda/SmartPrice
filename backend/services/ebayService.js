const axios = require('axios');


// async function getEbayProducts(query) {
//   const appId = process.env.EBAY_APP_ID;
//   const endpoint = 'https://svcs.ebay.com/services/search/FindingService/v1';

//   const params = {
//     'OPERATION-NAME': 'findItemsByKeywords',
//     'SERVICE-VERSION': '1.0.0',
//     'SECURITY-APPNAME': appId,
//     'RESPONSE-DATA-FORMAT': 'JSON',
//     'REST-PAYLOAD': true,
//     'keywords': query,
//     'paginationInput.entriesPerPage': 5
//   };

//   const { data } = await axios.get(endpoint, { params });
//   const items = data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
//   return items.map(item => ({
//     title: item.title[0],
//     price: item.sellingStatus[0].currentPrice[0]['__value__'],
//     currency: item.sellingStatus[0].currentPrice[0]['@currencyId'],
//     image: item.galleryURL[0],
//     url: item.viewItemURL[0]
//   }));
// }

// module.exports = { getEbayProducts };

async function getMockEbayProducts(query) {
  return [
    {
      title: `Mock eBay Product: ${query}`,
      price: '₹45,000',
      platform: 'eBay',
      url: 'https://www.ebay.com/mock-product-1',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: `${query} Special Edition on eBay`,
      price: '₹47,000',
      platform: 'eBay',
      url: 'https://www.ebay.com/mock-product-2',
      image: 'https://via.placeholder.com/150'
    }
  ];
}

module.exports = { getMockEbayProducts };
