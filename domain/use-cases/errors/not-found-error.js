'use strict';

class NotFoundDataError extends Error {
  constructor(message) {
    super();
    this.name = 'NotFoundDataError';
    this.message = message;
  }
}

function createNotFoundDataError(message) {
  return new NotFoundDataError(message);
}

module.exports = createNotFoundDataError;
