'use strict';

require('dotenv').config();

const port = process.env.PORT;
const app = require('./src/app');

const database = require('./src/database/database');
const logger = require('./src/utils/logger');
const sqlite3 = require('sqlite3');

const main = async () => {
  try {
    sqlite3.verbose();
    await database.init();

    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
  } catch (err) {
    logger.error(err);
  }
};

main();
