'use strict';

const getJobDetailUC = require('../../../domain/use-cases/jobs/get-job-detail-uc');

async function getJobDetailController(req, res, next) {
  const { jobId } = req.query;
  const { authorization } = req.headers;

  try {
    const jobInfo = await getJobDetailUC(jobId, authorization);

    return res.status(200).send(jobInfo);
  } catch (e) {
    return next(e);
  }
}

module.exports = getJobDetailController;
