'use strict';

const Joi = require('joi');

const loginExecutor = require('../accounts/login-executor.js');

// TODO: ¿Refactorizar?
async function validateData(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    role: Joi.string().min(4).max(6).required(),
  };

  return Joi.validate(payload, schema);
}

async function login(credentials) {
  try {
    await validateData(credentials);
  } catch (e) {
    throw e;
  }
  try {
    return await loginExecutor(credentials);
  } catch (e) {
    throw e;
  }
}

module.exports = login;
