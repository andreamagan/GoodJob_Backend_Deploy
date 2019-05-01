'use strict';

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.name = 'ForbiddenError';
    this.message = message;
  }
}

function createForbiddenError(message) {
  console.log('no pasarás');
  return new ForbiddenError(message);
}

module.exports = createForbiddenError;
