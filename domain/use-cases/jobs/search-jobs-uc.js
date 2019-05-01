'use strict';

const checkAuthorization = require('../sessions/check-jwt-token-uc');

const jobRepository = require('../../repositories/job-repository');

async function searchJobsUC(keyword, authorization) {
  await checkAuthorization(authorization);
  try {
    const jobs = await jobRepository.searchJobs(keyword);
    return jobs;
  } catch (e) {
    throw e;
  }
}

module.exports = searchJobsUC;
