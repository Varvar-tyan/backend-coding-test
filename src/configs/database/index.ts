import {Database, open} from 'sqlite';
import sqlite3 from 'sqlite3';
import buildSchemas from './schemas';

class DBConnection {
  db: Database;
  async init() {
    this.db = await open({
      filename: ':memory:',
      driver: sqlite3.Database,
    });
    await buildSchemas(this.db);
  }
}

export default new DBConnection();
