import Database from 'better-sqlite3';
import { SQLITE_PATCH } from '../config';

let db: Database.Database;

try {
  db = new Database(SQLITE_PATCH);
  console.log('Database connected');
} catch (error) {
  console.error(error);
  process.exit(1);
}

export const sqliteRun = (sql: string, params?: unknown[]): unknown => {
  try {
    const stmt = db.prepare(sql);
    return stmt.run(params ?? []);
  } catch (error) {
    throw error;
  }
};

export const sqliteGet = (sql: string, params?: unknown[]): unknown => {
  try {
    const stmt = db.prepare(sql);
    return stmt.get(params ?? []);
  } catch (error) {
    throw error;
  }
};

export const sqliteAll = (sql: string, params?: unknown[]): unknown[] => {
  try {
    const stmt = db.prepare(sql);
    return stmt.all(params ?? []);
  } catch (error) {
    throw error;
  }
};
