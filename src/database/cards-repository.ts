import { Card } from '../types/cards';
import { sqliteAll, sqliteGet, sqliteRun } from './db-connections';

export const createdCard = (card: Card): void => {
  sqliteRun(
    `
    INSERT INTO cards (id,text)
    VALUES (?,?)
    `,
    [card.id, card.text],
  );
};

export const updateCard = (card: Card): void => {
  sqliteRun(
    `
    UPDATE cards SET text = ?
    WHERE id = ?
    `,
    [card.text, card.id],
  );
};

export const deleteCard = (id: string): void => {
  sqliteRun(
    `
    DELETE FROM cards
    WHERE id = ?
    `,
    [id],
  );
};

export const getOneCard = (id: string): Card | null => {
  const data = sqliteGet(
    `
      SELECT * FROM cards 
      WHERE id = ?
    `,
    [id],
  );
  if (isCard(data)) {
    return data;
  }
  return null;
};

export const getAllCards = (): Card[] => {
  const data = sqliteAll(`
    SELECT * FROM cards
    `);

  if (!Array.isArray(data)) {
    console.error(`Unknown data format on getAll: ${data}`);
    throw new Error('Unknown data format on getAll');
  }

  return data
    .map((one) => {
      if (isCard(one)) {
        return one;
      }
      return undefined;
    })
    .filter((one) => one !== undefined);
};

const isCard = (data: unknown): data is Card => {
  const card = data as Card;
  return Boolean(card && typeof card === 'object' && card.id && card.text);
};
