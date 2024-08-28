/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { FetchService } from './services/FetchService';

const BASE_API_URL = 'https://dummyjson.com';

const app = express();
const fetchService = FetchService.getInstance(BASE_API_URL);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to grokking-express-app!' });
});

app.get('/api/fetchdata', async (req, res) => {
  try {
    const category = req.query.category;
    const products = await fetchService.fetchData(category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Data for this category could not be found' });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
