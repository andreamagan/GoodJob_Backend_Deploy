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
    const activate = await activateAccountUC(verificationData);
    if (activate) {
      return res.redirect(`${process.env.HTTP_FRONT_DOMAIN}/welcome`);
    }
    return res.send('Something was wrong');
  } catch (e) {
    return next(e);
  }
}

module.exports = activateAccountController;
