'use strict';

const activateAccountUC = require('../../../domain/use-cases/accounts/activate-account-uc');

/**
 * Activate account if verification code is valid
 * @module activateAccountController
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function activateAccountController(req, res, next) {
  const verificationData = { ...req.query };
  try {
    await activateAccountUC(verificationData);
    return res.redirect(`${process.env.HTTP_FRONT_DOMAIN}/welcome`);
  } catch (e) {
    return next(e);
  }
}

module.exports = activateAccountController;
