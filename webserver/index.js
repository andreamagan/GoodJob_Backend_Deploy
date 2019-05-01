'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
let server = null;
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, POST, PATCH, GET, DELETE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Request-Method, x-market'
  );
  next();
});

app.use('/api', routes.accountRouter);
app.use('/api', routes.playerRouter);
app.use('/api', routes.teamRouter);
app.use('/api', routes.jobRouter);
app.use('/api', routes.searchRouter);


app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send(err);
  }

  if (err.name === 'AuthenticatedError') {
    return res.status(401).send(err);
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).send(err);
  }

  if (err.name === 'NotFoundDataError') {
    return res.status(404).send(err);
  }

  console.error('Error 500', err);
  return res.status(500).send({
    message: err.message,
  });
});

/**
 * Start listening requests at a given port
 * @param {Number} port
 */
async function listen(port) {
  if (server == null) {
    server = await app.listen(port);
  } else {
    console.error("Can't listen, server already initialized");
  }
}

/**
 * Stop listening requests
 */
async function close() {
  if (server) {
    await server.close();
    server = null;
  } else {
    console.error("Can't close a non started server");
  }
}

module.exports = {
  listen,
  close,
};
