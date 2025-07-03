function formatResults(products) {
  return products.map(p => ({
    title: p.title,
    price: `${p.price} ${p.currency}`,
    platform: 'eBay',
    url: p.url,
    image: p.image
  }));
}

module.exports = { formatResults };
