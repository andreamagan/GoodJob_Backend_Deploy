'use strict';

const postJobUC = require('../../../domain/use-cases/jobs/post-job-uc');

async function postJobController(req, res, next) {
  const jobInputData = { ...req.body };
  const { authorization } = req.headers;

  try {
    await postJobUC(jobInputData, authorization);
    return res.status(201).send('');
  } catch (e) {
    return next(e);
  }
}

module.exports = postJobController;
