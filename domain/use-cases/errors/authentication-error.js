'use strict';

class AuthenticatedError extends Error {
  constructor(message) {
    super();
    this.name = 'AuthenticatedError';
    this.message = message;
    this.status = 401;
  }
}


function createAuthenticatedError(message) {
  return new AuthenticatedError(message);
}

module.exports = createAuthenticatedError;
