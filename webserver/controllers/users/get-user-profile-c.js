
'use strict';

const getUserProfileUC = require('../../../domain/use-cases/users/get-user-profile-uc');

async function getUserProfileController(req, res, next) {
  const { authorization } = req.headers;

  try {
    const userProfile = await getUserProfileUC(authorization);

    return res.status(200).send(userProfile);
  } catch (e) {
    return next(e);
  }
}

module.exports = getUserProfileController;
