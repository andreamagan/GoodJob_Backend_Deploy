'use strict';

const deleteJobUC = require('../../../domain/use-cases/jobs/delete-job-uc');

async function deleteJobController(req, res, next) {
  const jobId = { ...req.query };
  const { authorization } = req.headers;

  try {
    await deleteJobUC(jobId, authorization);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

module.exports = deleteJobController;
