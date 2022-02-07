import 'dotenv/config';
import app from './src/app';
import logger from './src/utils/logger';
import * as sqlite3 from 'sqlite3';
import database from './src/configs/database';

const port = process.env.PORT;

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
