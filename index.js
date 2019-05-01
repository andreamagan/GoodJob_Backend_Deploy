'use strict';

require('dotenv').config();
const webServer = require('./webserver');
const mongoPool = require('./databases/mongo-pool');

const httpServerConfig = process.env.PORT;

process.on('uncaughtException', (err) => {
  console.error('excepción inesperada', err.message, err);
});

process.on('unhandledRejection', (err) => {
  console.error('Error inesperado', err.message, err);
});

(async function initApp() {
  try {
    await mongoPool.connect();
    await webServer.listen(httpServerConfig);
    console.log(`server running at: ${httpServerConfig}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}());
