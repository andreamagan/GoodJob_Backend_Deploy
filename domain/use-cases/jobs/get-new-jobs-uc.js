'use strict';

const checkAuthorization = require('../sessions/check-jwt-token-uc');

const jobRepository = require('../../repositories/job-repository');

async function getNewJobsUC(authorization) {
  await checkAuthorization(authorization);

  try {
    const newJobs = await jobRepository.getNewJobs();
    return newJobs;
  } catch (e) {
    throw e;
  }
}

module.exports = getNewJobsUC;
