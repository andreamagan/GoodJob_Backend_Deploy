'use strict';

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.name = 'unauthorizedError';
    this.message = message;
  }
}

function createunauthorizedError(message) {
  return new UnauthorizedError(message);
}

module.exports = createunauthorizedError;
