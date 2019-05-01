'use strict';

const playerRepository = require('../../../repositories/player-repository');

const checkAuthorization = require('../../sessions/check-jwt-token-uc');

async function searchPlayers(authorization, keyword) {
  await checkAuthorization(authorization);

  try {
    const playerProfiles = await playerRepository.searchPlayers(keyword);
    return playerProfiles;
  } catch (e) {
    throw e;
  }
}

module.exports = searchPlayers;
