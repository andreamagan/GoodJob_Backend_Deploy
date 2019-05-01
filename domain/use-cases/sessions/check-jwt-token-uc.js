'use strict';

const jwt = require('jsonwebtoken');
const createUnauthorizedError = require('../../use-cases/errors/unauthorized-error');

async function checkJwtToken(authorization) {
  if (!authorization) {
    throw createUnauthorizedError();
  }

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'JWT') {
    throw createUnauthorizedError();
  }

  if (!token) {
    throw createUnauthorizedError();
  }

  const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET);

  if (!decoded) {
    throw createUnauthorizedError();
  }

  const claims = {
    uuid: decoded.uuid,
    role: decoded.role,
  };
  return claims;
}

module.exports = checkJwtToken;
