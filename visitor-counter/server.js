const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

// Path to the visitor count file
const visitorCountFilePath = path.join(__dirname, 'r.visitorcount.json');

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// Function to read visitor count from file
const readVisitorCount = () => {
    try {
        const data = fs.readFileSync(visitorCountFilePath, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.count;
    } catch (error) {
        return 0; // If file doesn't exist or there's an error, start with 0
    }
};

// Function to write visitor count to file
const writeVisitorCount = (count) => {
    const data = JSON.stringify({ count });
    fs.writeFileSync(visitorCountFilePath, data, 'utf8');
};

// Route to increment visitor count and return it
app.get('/visitor-count', (req, res) => {
    let count = readVisitorCount();
    count += 1;
    writeVisitorCount(count);
    res.json({ count });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('Using secret key:', secretKey);
