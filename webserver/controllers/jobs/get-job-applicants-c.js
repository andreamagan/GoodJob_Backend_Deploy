'use strict';

const getJobApplicantsUC = require('../../../domain/use-cases/jobs/get-job-applicants-uc');

async function getJobApplicantsController(req, res, next) {
  const { jobId } = req.query;
  const { authorization } = req.headers;

  try {
    const jobApplicants = await getJobApplicantsUC(jobId, authorization);
    return res.status(200).send(jobApplicants);
  } catch (e) {
    return next(e);
  }
}

module.exports = getJobApplicantsController;
