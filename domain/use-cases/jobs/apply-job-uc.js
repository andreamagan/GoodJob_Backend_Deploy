'use strict';

const checkAuthorization = require('../sessions/check-jwt-token-uc');
const acceptOnlyRole = require('../sessions/accept-only-role-uc');

const jobRepository = require('../../repositories/job-repository');


async function applyJobUC(jobId, authorization) {
  const { uuid, role } = await checkAuthorization(authorization);

  const aceptedRole = 'player';
  await acceptOnlyRole(role, aceptedRole);

  try {
    await jobRepository.applyJob(jobId, uuid);
  } catch (err) {
    throw err;
  }
}

module.exports = applyJobUC;
