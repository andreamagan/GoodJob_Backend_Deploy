'use strict';

const createForbiddenError = require('../errors/forbidden-error');

async function acceptOnlyRole(role, acceptedRole) {
  if (role !== acceptedRole) {
    throw createForbiddenError('You Shall not pass');
  }
  return null;
}

module.exports = acceptOnlyRole;
