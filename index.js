'use strict';

const port = 8010;
const app = require('./src/app');

const init = require('./src/database');
const logger = require('./src/logger');
const sqlite3 = require('sqlite3');

const main = async () => {
  try {
    sqlite3.verbose();
    const db = await init();

    const server = app(db);
    server.listen(port, () => logger.info(`App started and listening on port ${port}`));
  } catch (err) {
    logger.error(err);
  }
};

main();
