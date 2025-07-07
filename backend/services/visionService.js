const vision = require('@google-cloud/vision');
const path = require('path');

// Path to your service account JSON key
const keyPath = path.join(__dirname, '../google-vision-key.json'); // 🔑 Update the name if needed

const client = new vision.ImageAnnotatorClient({
  keyFilename: keyPath,
});

async function detectLabelsFromImage(filePathOrBuffer) {
  const [result] = await client.labelDetection({ image: { content: filePathOrBuffer } });
  const labels = result.labelAnnotations.map(label => label.description);
  return labels;
}

module.exports = { detectLabelsFromImage };
