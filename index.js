'use strict';

require('dotenv').config();
const webServer = require('./webserver');
const mongoPool = require('./databases/mongo-pool');
const httpServerConfig = require('./config/http-server-config');

process.on('uncaughtException', (err) => {
  console.error('excepción inesperada', err.message, err);
});

process.on('unhandledRejection', (err) => {
  console.error('Error inesperado', err.message, err);
});

(async function initApp() {
  try {
    await mongoPool.connect();
    await webServer.listen(httpServerConfig.port);
    console.log(`server running at: ${httpServerConfig.port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}());
