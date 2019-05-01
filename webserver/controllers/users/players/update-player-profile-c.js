'use strict';

const updatePlayerAccountUC = require('../../../../domain/use-cases/users/players/update-player-profile-uc');

async function updatePlayerAccountController(req, res, next) {
  const userDataInput = { ...req.body };
  const { authorization } = req.headers;

  try {
    await updatePlayerAccountUC(userDataInput, authorization);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

module.exports = updatePlayerAccountController;
