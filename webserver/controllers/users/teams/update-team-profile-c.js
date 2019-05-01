'use strict';

const updateTeamAccountUC = require('../../../../domain/use-cases/users/teams/update-team-profile-uc');

async function updateTeamAccountController(req, res, next) {
  const userDataInput = { ...req.body };
  const { authorization } = req.headers;

  try {
    await updateTeamAccountUC(userDataInput, authorization);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

module.exports = updateTeamAccountController;
