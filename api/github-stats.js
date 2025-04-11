const { MongoClient } = require('mongodb');
const createSVG = require('../stats-template');

let cachedClient = null;
let cachedDb = null;

module.exports = async (req, res) => {
  try {
    if (!cachedClient || !cachedDb) {
      cachedClient = new MongoClient(process.env.MONGO_URI);
      await cachedClient.connect();
      cachedDb = cachedClient.db('githubStats');
    }

    const username = req.query.username;

    if (!username) {
      return res.status(400).send('Missing "username" query parameter.');
    }

    const summary = await cachedDb.collection('summary').findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') }
    });

    if (!summary) {
      return res.status(404).send(`User "${username}" not found.`);
    }

    const svg = createSVG(summary);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (err) {
    console.error('Erro ao gerar SVG:', err);
    res.status(500).send('Something went wrong.');
  }
};
