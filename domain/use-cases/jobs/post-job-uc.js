'use strict';

const Joi = require('joi');

const checkAuthorization = require('../sessions/check-jwt-token-uc');
const acceptOnlyRole = require('../sessions/accept-only-role-uc');

const teamRepository = require('../../repositories/team-repository');
const jobRepository = require('../../repositories/job-repository');

async function validate(payload) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(128)
      .required(),
    description: Joi.string()
      .min(50)
      .required(),
    tags: Joi.array()
      .min(1)
      .required(),
  };

  return Joi.validate(payload, schema);
}

async function postJobUC(jobInputData, authorization) {
  const { uuid, role } = await checkAuthorization(authorization);
  await acceptOnlyRole(role, 'team');

  await validate(jobInputData);

  const teamProfile = await teamRepository.getProfile(uuid);

  try {
    const jobPosted = await jobRepository.postJob(teamProfile, jobInputData);
    const { jobId } = jobPosted;

    await teamRepository.postJob(uuid, jobId);
    return null;
  } catch (err) {
    throw err;
  }
}

module.exports = postJobUC;
