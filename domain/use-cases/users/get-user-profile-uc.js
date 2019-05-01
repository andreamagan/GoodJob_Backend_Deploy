'use strict';

const playerRepository = require('../../repositories/player-repository');
const teamRepository = require('../../repositories/team-repository');

const checkAuthorization = require('../sessions/check-jwt-token-uc');

async function getUserProfile(authorization) {
  const claims = await checkAuthorization(authorization);
  const { uuid, role } = claims;
  const userUuid = uuid;
  const userRole = role;
  try {
    const userProfile = (userRole === 'player') ? await playerRepository.getProfile(userUuid) : teamRepository.getProfile(userUuid);
    return userProfile;
  } catch (e) {
    throw e;
  }
}

module.exports = getUserProfile;
