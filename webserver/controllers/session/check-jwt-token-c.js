'use strict';

const checkJwtTokenUC = require('../../../domain/use-cases/sessions/check-jwt-token-uc');

async function checkJwtTokenController(req, res, next) {
  try {
    const { authorization } = req.headers;
    req.claims = await checkJwtTokenUC(authorization);
    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = checkJwtTokenController;
