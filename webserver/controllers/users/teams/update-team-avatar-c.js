'use strict';

const updateTeamAvatarUC = require('../../../../domain/use-cases/users/teams/update-team-avatar-uc');

async function updateTeamAvatarController(req, res, next) {
  const { file } = req;
  const { authorization } = req.headers;

  try {
    const avatarUrl = await updateTeamAvatarUC(file, authorization);
    // TODO: Devolver url o borrar
    console.log('c', avatarUrl);
    res.header('Location', avatarUrl);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

module.exports = updateTeamAvatarController;
