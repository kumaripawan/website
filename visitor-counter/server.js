const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the public directory
app.use(express.static('public'));

// Route to handle requests for the visitor count
app.get('/api/visitor-count', (req, res) => {
    // Read the visitor count from a JSON file
    fs.readFile('r.visitorcount.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading visitor count:', err);
            res.status(500).json({ error: 'Failed to read visitor count' });
            return;
        }
        const count = JSON.parse(data).count;
        res.json({ count });
    });
});

// Route to increment the visitor count
app.post('/api/increment-visitor-count', (req, res) => {
    // Read the current count from the JSON file
    fs.readFile('r.visitorcount.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading visitor count:', err);
            res.status(500).json({ error: 'Failed to read visitor count' });
            return;
        }
        const count = JSON.parse(data).count;

        // Increment the count
        const newCount = count + 1;

        // Write the updated count back to the JSON file
        fs.writeFile('r.visitorcount.json', JSON.stringify({ count: newCount }), (err) => {
            if (err) {
                console.error('Error updating visitor count:', err);
                res.status(500).json({ error: 'Failed to update visitor count' });
                return;
            }
            res.json({ count: newCount });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
