require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const createSVG = require('./stats-template');

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

// Routes
app.get('/', async (req, res) => {
    try {
        const summary = await db.collection('summary').findOne({ username: 'fillipecool' });

        if (!summary) {
            return res.status(404).send('User not found');
        }

        const svg = createSVG(summary);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (err) {
        console.error('Error generating SVG:', err);
        res.status(500).send('Something went wrong.');
    }
});

// Start server
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Open your browser to view the SVG stats');
    });
});
