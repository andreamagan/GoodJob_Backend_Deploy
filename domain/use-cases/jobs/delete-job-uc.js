'use strict';

const checkAuthorization = require('../sessions/check-jwt-token-uc');
const acceptOnlyRole = require('../sessions/accept-only-role-uc');

const jobRepository = require('../../repositories/job-repository');

async function deleteJobUC(jobId, authorization) {
  const { role } = await checkAuthorization(authorization);
  // await acceptOnlyRole(role, process.env.EXPECTED_ROLE_TEAM);

  console.log('2', jobId);
  try {
    await jobRepository.deleteJob(jobId);
    return null;
  } catch (e) {
    throw e;
  }
}

module.exports = deleteJobUC;
