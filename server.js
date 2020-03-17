'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const dbImport = require(__dirname + '/db.js');
const sqlite3 = dbImport.sqlite3;
let db = dbImport.db;

const apiRouter = require('./routes/api');

const app = express();
const options = {
  extended: false
};
app.use(bodyParser.urlencoded(options));
app.use(bodyParser.json());
app.use(express.static("public"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Random Stardew Valley Quote API Server is listening on port ${port}`));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  console.log('This is the home page.');
});

app.use('/api', apiRouter);

app.use(function(req, res){
  console.error("404 Error");
  res.status(404).json({"error": "404 - Sorry, the API cannot find that request"});
});

app.use(function(err, req, res, next) {
  res.status(500).send({"error": "505 - Internal Error"})
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
