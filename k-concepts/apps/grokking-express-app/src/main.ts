/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { FetchService } from './services/FetchService';
import logger from '@k-concepts/logger';

const BASE_API_URL = 'https://dummyjson.com';

const app = express();
const fetchService = FetchService.getInstance(BASE_API_URL);

app.get('/api', (req, res) => {
  logger.info('GET request to /api');
  res.send({ message: 'Welcome to grokking-express-app!' });
});

app.get('/api/fetchdata', async (req, res) => {
  const category = req.query.category as string;
  logger.info(`GET request to /api/fetchdata with category: ${category}`);
  try {
    const products = await fetchService.fetchData(category);
    logger.info(`Successfully fetched data for category: ${category}`);
    res.json(products);
  } catch (error) {
    logger.error(`Error fetching data for category: ${category}`, error);
    res.status(500).json({ error: 'Data for this category could not be found' });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}/api`);
});
server.on('error', (error) => {
  logger.error('Server error:', error);
});
