
'use strict';

const searchTeamsUC = require('../../../../domain/use-cases/users/teams/search-teams-uc');

async function searchTeamsController(req, res, next) {
  const { authorization } = req.headers;
  const { keyword } = req.query;

  try {
    const teamsProfile = await searchTeamsUC(authorization, keyword);

    return res.status(200).send(teamsProfile);
  } catch (e) {
    return next(e);
  }
}

module.exports = searchTeamsController;
