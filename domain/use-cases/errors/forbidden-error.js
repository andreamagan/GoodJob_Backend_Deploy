'use strict';

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.name = 'ForbiddenError';
    this.message = message;
  }
}

function createForbiddenError(message) {
  return new ForbiddenError(message);
}

module.exports = createForbiddenError;
