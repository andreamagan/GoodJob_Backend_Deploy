'use strict';

const checkAuthorization = require('../../sessions/check-jwt-token-uc');
const acceptOnlyRole = require('../get-user-profile-uc');

const playerRepository = require('../../../repositories/player-repository');

async function deleteTagsUC(userTags, authorization) {
  const { uuid, role } = await checkAuthorization(authorization);
  await acceptOnlyRole(role, 'player');

  try {
    await playerRepository.deleteTags(userTags, uuid);
  } catch (err) {
    throw err;
  }
}

module.exports = deleteTagsUC;
