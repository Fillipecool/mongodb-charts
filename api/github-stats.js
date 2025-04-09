const { MongoClient } = require('mongodb');
const createSVG = require('../stats-template');

let cachedClient = null;

module.exports = async (req, res) => {
  const client = cachedClient || new MongoClient(process.env.MONGO_URI);

  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = client.db('githubStats');
    const summary = await db.collection('summary').findOne({ username: 'fillipecool' });

    if (!summary) {
      return res.status(404).send('User not found');
    }

    const svg = createSVG(summary);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
};
