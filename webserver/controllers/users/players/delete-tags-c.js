'use strict';

const deleteTagsUC = require('../../../../domain/use-cases/users/players/delete-tags-uc');

async function deleteTagsController(req, res, next) {
  const userTags = { ...req.body };
  const { authorization } = req.headers;

  try {
    await deleteTagsUC(userTags, authorization);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

module.exports = deleteTagsController;
