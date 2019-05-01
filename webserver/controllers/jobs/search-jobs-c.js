'use strict';

const searchJobUC = require('../../../domain/use-cases/jobs/search-jobs-uc');

async function searchJobController(req, res, next) {
  const { keyword } = req.query;
  const { authorization } = req.headers;

  try {
    const jobs = await searchJobUC(keyword, authorization);
    return res.status(200).send(jobs);
  } catch (e) {
    return next(e);
  }
}

module.exports = searchJobController;
