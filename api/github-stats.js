const { MongoClient } = require('mongodb');
const createSVG = require('../stats-template');

const client = new MongoClient(process.env.MONGODB_URI);
let clientPromise = client.connect();

module.exports = async (req, res) => {
  try {
    const connectedClient = await clientPromise;
    const db = connectedClient.db('githubStats');
    const summary = await db.collection('summary').findOne({ username: 'fillipecool' });

    if (!summary) {
      return res.status(404).send('User not found');
    }

    const svg = createSVG(summary);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (err) {
    console.error('Erro ao gerar SVG:', err);
    res.status(500).send('Something went wrong.');
  }
};
