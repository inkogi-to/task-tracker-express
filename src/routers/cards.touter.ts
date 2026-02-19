import express, { Response, Request, Router } from 'express';
import { Card, CreateCardRequest, GetCardsResponse } from '../types/cards';
import { IdParams } from '../types/common';
import {
  createdCard,
  deleteCard,
  getAllCards,
  getOneCard,
  updateCard,
} from '../database/cards-repository';
import { randomUUID } from 'crypto';

export const cardsRouter: Router = express.Router();

cardsRouter.get(
  '/',
  async (req: Request<{}, {}>, res: Response<GetCardsResponse>) => {
    const cards = await getAllCards();
    res.send(cards);
  },
);

cardsRouter.get(
  '/:id',
  async (req: Request<IdParams, {}>, res: Response<Card>) => {
    const card = await getOneCard(req.params.id);

    if (!card) {
      res.sendStatus(404);
      return;
    }

    res.send(card);
  },
);

cardsRouter.post(
  '/',
  async (req: Request<{}, Card, CreateCardRequest>, res: Response<Card>) => {
    const card: Card = {
      text: req.body.text,
      id: randomUUID(),
    };
    await createdCard(card);
    res.send(card);
  },
);

cardsRouter.put(
  '/:id',
  async (
    req: Request<IdParams, Card, CreateCardRequest>,
    res: Response<Card>,
  ) => {
    const card: Card = {
      text: req.body.text,
      id: req.params.id,
    };
    await updateCard(card);
    res.send(card);
  },
);

cardsRouter.delete('/:id', async (req: Request<IdParams>, res: Response<void>) => {
  await deleteCard(req.params.id);
  res.sendStatus(204);
});
