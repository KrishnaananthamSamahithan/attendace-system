require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Read users.json file
  fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    const users = JSON.parse(data);

    // Check if the provided credentials match any user in the file
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Generate JWT token if credentials are correct
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ accessToken: token });
    } else {
      // If credentials do not match
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
