import { sqliteRun } from './db-connections';

export const createTable = (): void => {
  sqliteRun(`
    CREATE TABLE IF NOT EXISTS cards(
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL
    )
    `);
};
