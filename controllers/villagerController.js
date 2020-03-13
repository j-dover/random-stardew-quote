'use strict';
const dbImport = require('../db.js');
const sqlite3 = dbImport.sqlite3;
let db = dbImport.db;

exports.getVillagers = function(req, res) {
  // Get list of all villagers
  var sql = 'SELECT * from Villager';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      console.error(err.message);
      return;
    }
    res.json({
      "Villagers":rows
    });
  });
}

exports.getVillagerById = function(req, res) {
  // Get villager by villager_id
  var sql = 'SELECT * from Villager where villager_id = ?';
  var params = [req.params.villager_id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "Villager":row
    })
  })
}
