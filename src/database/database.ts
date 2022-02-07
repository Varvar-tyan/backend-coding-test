import {Database} from 'sqlite';
import {open} from 'sqlite';
import sqlite3 from 'sqlite3';
import buildSchemas from './schemas';

class DB {
  db: Database;
  async init() {
    this.db = await open({
      filename: ':memory:',
      driver: sqlite3.Database,
    });
    await buildSchemas(this.db);
  }
}

export default new DB();
