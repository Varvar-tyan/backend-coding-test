const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const buildSchemas = require('./schemas');

module.exports = async () => {
  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });
  await buildSchemas(db);

  return db;
};
