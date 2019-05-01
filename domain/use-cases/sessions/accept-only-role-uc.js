'use strict';

const createForbiddenError = require('../errors/forbidden-error');

async function acceptOnlyRole(role, acceptedRole) {
  // console.log(role, acceptedRole);
  if (role !== acceptedRole) {
    throw createForbiddenError();
  }
  return null;
}

module.exports = acceptOnlyRole;
