const express = require('express')
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT)
