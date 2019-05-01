'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const sgMail = require('@sendgrid/mail');


const createAccountExecutor = require('../accounts/create-account-executor');


// TODO: ¿Refactorizar?
async function validateData(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    role: Joi.string().required().valid('player', 'team'),
  };

  return Joi.validate(payload, schema);
}


async function sendEmailActivateAccount(role, email, verificationCode) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: {
      email: 'goodjob.amr@gmail.com',
      name: 'Andrea from GoodJob',
    },
    dynamic_template_data: {
      email,
      url: `${process.env.HTTP_SERVER_DOMAIN}/api/account/activate?verificationCode=${verificationCode}&role=${role}&email=${email}`,
    },
    template_id: process.env.SENDGRID_TEMPLATE_ID,
  };
  sgMail.send(msg);
}

async function createAccountUC(accountData) {
  const { email, password, role } = accountData;

  try {
    await validateData(accountData);
  } catch (e) {
    throw e;
  }

  const verificationCode = uuidV4();
  const securePassword = await bcrypt.hash(password, 10);
  const uuid = uuidV4();
  const userData = {
    uuid, email, securePassword, verificationCode, role,
  };
  const userCreated = await createAccountExecutor(userData);

  try {
    await sendEmailActivateAccount(role, email, verificationCode);
  } catch (e) {
    throw e;
  }

  return userCreated;
}


module.exports = createAccountUC;
