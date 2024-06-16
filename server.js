'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('<h1 style="color:green;">Welcome to kubernetes!!</h1> \n');
  res.send('<p style="color:gray;">This is a simple node.js app running on kubernetes cluster on a home labe environment.!</p>')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
