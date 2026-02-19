import { PORT } from './config';
import express from 'express';
import { cardsRouter } from './routers/cards.touter';
import { createTable } from './database/create-table';

async function run() {
  createTable();

  const server = express();
  server.use(express.json());

  server.get('/', (req, res) => {
    res.send('Hello World!');
  });

  server.use('/api/cards', cardsRouter);

  server.listen(PORT);
}
run().catch((error) => console.error(error));
