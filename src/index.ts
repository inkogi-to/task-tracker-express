import { PORT } from './config';
import express from 'express';
import { cardsRouter } from './routers/cards.touter';


const server = express();

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.use('/api/cards', cardsRouter);

server.listen(PORT);