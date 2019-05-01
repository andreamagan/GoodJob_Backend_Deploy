'use strict';

const getNewJobsUC = require('../../../domain/use-cases/jobs/get-new-jobs-uc');

async function getNewJobsController(req, res, next) {
  const { authorization } = req.headers;

  try {
    const newJobs = await getNewJobsUC(authorization);

    return res.status(200).send(newJobs);
  } catch (e) {
    return next(e);
  }
}

module.exports = getNewJobsController;
