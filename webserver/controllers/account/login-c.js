'use strict';

const loginUC = require('../../../domain/use-cases/accounts/login-uc');

async function loginController(req, res, next) {
  const credentials = { ...req.body };

  try {
    const response = await loginUC(credentials);
    return res.status(200).send(response);
  } catch (e) {
    return next(e);
  }
}

module.exports = loginController;
