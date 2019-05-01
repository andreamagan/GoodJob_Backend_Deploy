'use strict';

const teamRepository = require('../../../repositories/team-repository');

const checkAuthorization = require('../../sessions/check-jwt-token-uc');

async function searchTeams(authorization, keyword) {
  await checkAuthorization(authorization);

  try {
    const teamProfiles = await teamRepository.searchTeams(keyword);
    return teamProfiles;
  } catch (e) {
    throw e;
  }
}

module.exports = searchTeams;
