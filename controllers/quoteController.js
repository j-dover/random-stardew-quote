'use strict';
var dbImport = require('../db.js');
var db = dbImport.db;
var sqlite3 = dbImport.sqlite3;

// Get one random quote
exports.getRandomQuote = function (req, res) {
    let sql = `SELECT quote, villager_name
    FROM Quotes
    LEFT JOIN VIllager ON
    Villager.villager_id = Quotes.villager_id
    ORDER BY random()
    LIMIT 1`;
    db.get(sql, [], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(400).send({"error": err.message});
        return;
      }
      res.json({"random_quote": row});
    });
}

// Get a certain number of random quotes
exports.getRandomNumQuotes = function (req, res) {
  let sql = `
  SELECT quote, villager_name
  FROM Quotes
  LEFT JOIN Villager ON
  Villager.villager_id = Quotes.villager_id
  ORDER BY random()
  LIMIT ?`;

  if (!req.query.num || req.query.num === null) {
    console.error("400 Error - Bad Request");
    res.status(400).send({"error": "400 - Bad Request. The num query cannot be missing, empty, or null."});
    return;
  }

  if (isNaN(req.query.num) || req.query.num < 0 || (req.query.num % 1 > 0 && req.query.num % 1 < 1)) {
    console.error("400 Error - Bad Request");
    res.status(400).send({"error": "400 - Bad Request. The num query must contain a nonnegative integer."});
    return;
  }

  db.all(sql, [req.query.num], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).send({"error": err.message});
      return;
    }
    res.json({"random_quotes": rows});
  })
}
