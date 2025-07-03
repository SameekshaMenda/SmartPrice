const axios = require('axios');
const cheerio = require('cheerio');

async function getFlipkartProducts(query) {
  const searchURL = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(searchURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(data);
    const items = [];

    $('._1AtVbE').each((i, el) => {
      const title = $(el).find('._4rR01T, .s1Q9rs').text();
      const price = $(el).find('._30jeq3').text();
      const url = 'https://www.flipkart.com' + $(el).find('a').attr('href');
      const image = $(el).find('img').attr('src');

      if (title && price && url) {
        items.push({
          title,
          price,
          platform: 'Flipkart',
          url,
          image: image || ''
        });
      }
    });

    return items.slice(0, 5); // Limit to 5 results
  } catch (err) {
    console.error('❌ Flipkart scrape failed:', err.message);
    return [];
  }
}

module.exports = { getFlipkartProducts };
