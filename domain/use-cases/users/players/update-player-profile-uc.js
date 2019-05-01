'use strict';

const Joi = require('joi');

const checkAuthorization = require('../../sessions/check-jwt-token-uc');
const playerRepository = require('../../../repositories/player-repository');
const acceptOnlyRole = require('../../sessions/accept-only-role-uc');

async function validate(payload) {
  const schema = {
    profileInfo: {
      fullName: Joi.string()
        .min(3)
        .max(128)
        .required(),
      nickName: Joi.string()
        .min(3)
        .max(50)
        .required(),
      description: Joi.string().allow('', null),
      social: {
        twitterUrl: Joi.string()
          .uri()
          .allow('', null),
        twitchUrl: Joi.string()
          .uri()
          .allow('', null),
        instagramUrl: Joi.string()
          .uri()
          .allow('', null),
        webUrl: Joi.string()
          .uri()
          .allow('', null),
      },
    },
  };

  return Joi.validate(payload, schema);
}

async function updatePlayerProfile(userData, authorization) {
  const { uuid, role } = await checkAuthorization(authorization);
  await acceptOnlyRole(role, 'player');

  await validate(userData);

  try {
    await playerRepository.updateProfile(uuid, userData);
    return null;
  } catch (err) {
    throw err;
  }
}

module.exports = updatePlayerProfile;
