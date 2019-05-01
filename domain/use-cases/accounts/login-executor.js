'use strict';

const jwt = require('jsonwebtoken');

const playerRepository = require('../../repositories/player-repository');
const teamRepository = require('../../repositories/team-repository');
const createAuthenticationError = require('../errors/authentication-error');

async function loginExecutor(credentials) {
  const { email, password, role } = credentials;

  if (role === 'player') {
    try {
      await playerRepository.checkIfUserAccountExist(email, role);
    } catch (e) {
      throw createAuthenticationError('Account does not exist');
    }

    try {
      await playerRepository.checkIfActivatedAccount(email, role);
    } catch (e) {
      throw createAuthenticationError('Account is not activated yet');
    }

    try {
      await playerRepository.checkIfCorrectPassword(email, password, role);
    } catch (e) {
      throw createAuthenticationError('Wrong password');
    }

    try {
      const userAccount = await playerRepository.getUserAccountInfo(email, role);
      const [{ accountInfo }] = userAccount;
      const payloadJwt = {
        uuid: accountInfo.uuid,
        role: accountInfo.role,
      };
      const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
      const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
      const response = {
        uuid: payloadJwt.uuid,
        email,
        role,
        accessToken: token,
        expiresIn: jwtTokenExpiration,
      };
      return response;
    } catch (e) {
      throw e;
    }
  } else {
    try {
      await teamRepository.checkIfUserAccountExist(email, role);
    } catch (e) {
      throw createAuthenticationError('Account does not exist');
    }

    try {
      await teamRepository.checkIfActivatedAccount(email, role);
    } catch (e) {
      throw createAuthenticationError('Account is not activated yet');
    }

    try {
      await teamRepository.checkIfCorrectPassword(email, password, role);
    } catch (e) {
      throw createAuthenticationError('Wrong password');
    }

    try {
      const userAccount = await teamRepository.getUserAccountInfo(email, role);
      const [{ accountInfo }] = userAccount;
      const payloadJwt = {
        uuid: accountInfo.uuid,
        role: accountInfo.role,
      };
      const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
      const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
      const response = {
        uuid: accountInfo.uuid,
        role: accountInfo.role,
        accessToken: token,
        expiresIn: jwtTokenExpiration,
      };
      return response;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = loginExecutor;
