'use strict';

const Joi = require('joi');

const checkAuthorization = require('../../sessions/check-jwt-token-uc');
const teamRepository = require('../../../repositories/team-repository');


async function validate(payload) {
  const schema = {
    profileInfo: ({
      fullNameTeam: Joi.string().min(3).max(128).required(),
      nickName: Joi.string().max(3).required(),
      description: Joi.string().allow(null),
      social: ({
        twitterUrl: Joi.string().uri().allow(null),
        twichUrl: Joi.string().uri().allow(null),
        instagramUrl: Joi.string().uri().allow(null),
        webUrl: Joi.string().uri().allow(null),
      }),
    }),
  };

  return Joi.validate(payload, schema);
}

async function updateUserProfile(userData, authorization) {
  const { uuid, role } = await checkAuthorization(authorization);
  await acceptOnlyRole(role, process.env.EXPECTED_ROLE_TEAM);

  await validate(userData);

  try {
    await teamRepository.updateUserProfile(uuid, userData);
  } catch (err) {
    throw err;
  }
}

module.exports = updateUserProfile;
