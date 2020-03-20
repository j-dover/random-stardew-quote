// Connect to database
'use strict'
const sqlite3 = require('sqlite3').verbose();
let schema = `CREATE TABLE IF NOT EXISTS Villager (
  villager_id integer PRIMARY KEY AUTOINCREMENT,
  villager_name text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Quotes (
  quote_id integer PRIMARY KEY AUTOINCREMENT,
  villager_id integer,
  quote text NOT NULL UNIQUE,
  FOREIGN KEY (villager_id) REFERENCES Villager(villager_id)
);`;

let db = new sqlite3.Database('.data/random-stardew-quotes.db', (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  else {
    console.log("Currently connected to the API's SQlite database");
    db.exec('PRAGMA foreign_keys = ON;', function(err) {
      if (err) {
        console.error(err.message);
      }
      else {
        console.log("Database foreign key support is on");
      }
    });

    db.exec(schema, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }
});

module.exports.sqlite3 = sqlite3;
module.exports.db = db;
