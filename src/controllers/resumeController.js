const { getDB } = require('../config/db');
const { parsePDF } = require('../utils/pdfParser');
const { analyzeResume } = require('../utils/gemini');
const { encrypt } = require('../middleware/encryption');

const enrichResume = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Extract text from PDF
    const text = await parsePDF(url);
    if (!text) {
      return res.status(500).json({ error: 'No text data found in PDF' });
    }

    // Analyze with Gemini
    const resumeData = await analyzeResume(text);
    
    if (!resumeData || typeof resumeData !== 'object') {
      return res.status(500).json({ error: 'Failed to analyze resume data' });
    }

    // Encrypt sensitive data
    try {
      // Ensure the values are strings before encryption
      const name = String(resumeData.name || '');
      const email = String(resumeData.email || '');

      // Encrypt the string values
      resumeData.name = encrypt(name);
      resumeData.email = encrypt(email);

      // Log the data structure for debugging
      console.log('Resume data before MongoDB:', {
        ...resumeData,
        name: '[ENCRYPTED]',
        email: '[ENCRYPTED]'
      });

    } catch (encryptError) {
      console.error('Encryption error details:', encryptError);
      return res.status(500).json({ 
        error: 'Error encrypting sensitive data',
        details: encryptError.message 
      });
    }

    // Store in MongoDB
    const db = getDB();
    await db.collection('applicants').insertOne(resumeData);

    res.status(200).json(resumeData);
  } catch (error) {
    console.error('Resume enrichment error:', error);
    res.status(500).json({ 
      error: 'Failed to process resume',
      details: error.message 
    });
  }
};

module.exports = { enrichResume };