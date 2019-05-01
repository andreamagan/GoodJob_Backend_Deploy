'use strict';

const createAccountUC = require('../../../domain/use-cases/accounts/create-account-uc');

/**
 * Activate account if verification code is valid
 * @module activateAccountController
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function createAccountController(req, res, next) {
  const accountData = { ...req.body };

  try {
    await createAccountUC(accountData);
    return res.status(201).json();
  } catch (e) {
    return next(e);
  }
}

module.exports = createAccountController;
