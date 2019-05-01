
'use strict';

const searchPlayersUC = require('../../../../domain/use-cases/users/players/search-players-uc');

async function searchPlayersController(req, res, next) {
  const { authorization } = req.headers;
  const { keyword } = req.query;

  try {
    const playersProfile = await searchPlayersUC(authorization, keyword);

    return res.status(200).send(playersProfile);
  } catch (e) {
    return next(e);
  }
}

module.exports = searchPlayersController;
