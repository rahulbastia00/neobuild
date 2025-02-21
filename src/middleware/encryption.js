const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';

// Generate a 32-byte (256-bit) key from the environment variable
function getKey() {
  // If ENCRYPTION_KEY is not 32 bytes, hash it to get a 32-byte key
  return crypto
    .createHash('sha256')
    .update(String(process.env.ENCRYPTION_KEY))
    .digest();
}

function encrypt(text) {
  try {
    const iv = crypto.randomBytes(16);
    const key = getKey();
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Encryption failed');
  }
}

function decrypt(text) {
  try {
    const [ivHex, encryptedText] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = getKey();
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed');
  }
}

module.exports = { encrypt, decrypt };