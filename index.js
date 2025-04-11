require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const createSVG = require('./stats-template');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
let client;
let db;

async function connectToDatabase() {
    try {
        client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db('githubStats');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

// Serve static files from the public directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    const isLocalhost =
        req.hostname === 'localhost' ||
        req.hostname === '127.0.0.1';

    if (!isLocalhost) {
        // In production, serve the HTML page
        return res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }

    // The rest of this code only runs on localhost
    res.redirect('/svg-preview');
});

// Direct SVG preview route for localhost
app.get('/svg-preview', async (req, res) => {
    try {
        // Check if database is connected
        if (!db) {
            // If MongoDB isn't connected yet, generate a sample SVG
            const sampleData = {
                username: 'fillipecool (Sample)',
                contributions: {
                    commits: 450,
                    pull_requests: 32,
                    issues: 15,
                    stars: 78,
                    repos: 25,
                    reviews: 12,
                    followers: 23
                }
            };

            const svg = createSVG(sampleData);
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.send(svg);
        }

        // Try to get data from MongoDB
        const summary = await db.collection('summary').findOne({ username: 'fillipecool' });

        if (!summary) {
            // If user not found, generate sample data
            const sampleData = {
                username: 'fillipecool (No Data)',
                contributions: {
                    commits: 0,
                    pull_requests: 0,
                    issues: 0,
                    stars: 0,
                    repos: 0,
                    reviews: 0,
                    followers: 0
                }
            };

            const svg = createSVG(sampleData);
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.send(svg);
        }

        const svg = createSVG(summary);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (err) {
        console.error('Error generating SVG:', err);

        // Even on error, return a fallback SVG
        const errorData = {
            username: 'Error Loading Data',
            contributions: {
                commits: 0,
                pull_requests: 0,
                issues: 0,
                stars: 0,
                repos: 0,
                reviews: 0,
                followers: 0
            }
        };

        const svg = createSVG(errorData);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    }
});

// Start server
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Open your browser to view the SVG stats');
    });
});
