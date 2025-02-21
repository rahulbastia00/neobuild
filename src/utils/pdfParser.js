const axios = require('axios');
const pdf = require('pdf-parse');

async function parsePDF(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to parse PDF');
  }
}

module.exports = { parsePDF };