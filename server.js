const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const options = {
  extended: false
};
app.use(bodyParser.urlencoded(options));
app.use(bodyParser.json());
app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.listen(port, () => console.log(`Random Stardew Valley Quote API Server is listening on port ${port}`));
