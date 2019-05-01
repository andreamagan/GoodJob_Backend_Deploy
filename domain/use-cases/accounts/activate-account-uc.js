'use strict';

const createAuthenticationError = require('../errors/authentication-error');
const activateAccountExecutor = require('../accounts/activate-account-executor');

async function activateAccountUC(verificationData) {
  const { verificationCode } = verificationData;
  if (!verificationCode) {
    throw createAuthenticationError('invalid verification code');
  }
  try {
    return await activateAccountExecutor(verificationData);
  } catch (e) {
    throw e;
  }
}

module.exports = activateAccountUC;
