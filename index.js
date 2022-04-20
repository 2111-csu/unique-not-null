require('dotenv').config();

const {PORT = 3000} = process.env;
const client  = require('./db/client');

const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

const cors = require('cors');
server.use(cors());

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((req, res, next) => {
  res.status(404);
  res.send('Page Not Found');
});

server.use((err, req, res, next) => {
  res.status(500);
  res.send(err)
});

server.listen(PORT, () => {
  console.log('The Server is up on port', PORT);
  client.connect();
});