'use strict';

const checkAuthorization = require('../sessions/check-jwt-token-uc');
const acceptOnlyRole = require('../sessions/accept-only-role-uc');

const jobRepository = require('../../repositories/job-repository');
const playerRepositoy = require('../../repositories/player-repository');

async function getJobApplicantsUC(jobId, authorization) {
  const { role } = await checkAuthorization(authorization);
  const aceptedRole = 'team';
  await acceptOnlyRole(role, aceptedRole);

  try {
    const applicantsUuids = await jobRepository.getJobApplicantsUuids(jobId);
    const applicantsProfile = await playerRepositoy.getApplicantProfile(applicantsUuids);
    console.log('applicantsprofile', applicantsProfile);

    return applicantsProfile;
  } catch (e) {
    throw e;
  }
}

module.exports = getJobApplicantsUC;
