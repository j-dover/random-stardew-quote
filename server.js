'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const dbImport = require(__dirname + '/db.js');
const sqlite3 = dbImport.sqlite3;
let db = dbImport.db;

const app = express();
const options = {
  extended: false
};
app.use(bodyParser.urlencoded(options));
app.use(bodyParser.json());
app.use(express.static("public"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Random Stardew Valley Quote API Server is listening on port ${port}`));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  console.log('This is the home page.');
});

app.get('/api/quotes', (req, res, next) =>{
  // Get all quotes
  var sql = 'SELECT * from Quotes';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      console.error(err.message);
      return;
    }
    res.json({
      "Quotes":rows
    });
  });
});

app.get("/api/villagers", (req, res, next) => {
  // Get all villagers
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
});

app.use(function(req, res){
  console.error("404 Error");
  res.status(404).json({"error": "404 - Sorry, the API cannot find that request"});
});

app.use(function(err, req, res, next) {
  res.status(500).send("")
});

process.on('SIGINT', () => {
  server.close(() => {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Closed database connection');
    });
    console.log('Current process terminated');
  });
})

module.exports = server;
