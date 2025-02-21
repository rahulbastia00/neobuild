const { getDB } = require('../config/db');
const { decrypt } = require('../middleware/encryption');

const searchResumes = async (req, res) => {
  try {
    const { name } = req.body;
    const db = getDB();
    
    const applicants = await db.collection('applicants').find().toArray();
    
    // Decrypt and search
    const matches = applicants.filter(applicant => {
      const decryptedName = decrypt(applicant.name).toLowerCase();
      return decryptedName.includes(name.toLowerCase());
    });

    if (matches.length === 0) {
      return res.status(404).json({ error: 'No matches found' });
    }

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchResumes };