const jwt = require('jsonwebtoken');

const VALID_CREDENTIALS = {
  username: "naval.ravikant",
  password: "05111974"
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === VALID_CREDENTIALS.username && 
      password === VALID_CREDENTIALS.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ JWT: token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};

module.exports = { login };