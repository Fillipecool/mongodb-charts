require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const createSVG = require('./stats-template');

const app = express();
const port = process.env.PORT || 3000;

const client = new MongoClient(process.env.MONGO_URI);

app.get('/github-stats', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('githubStats');
    const summary = await db.collection('summary').findOne({ username: 'fillipecool' });

    if (!summary) {
      return res.status(404).send('User not found');
    }

    const svg = createSVG(summary);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
