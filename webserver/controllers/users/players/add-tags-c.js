'use strict';

const addTagsUC = require('../../../../domain/use-cases/users/players/add-tags-uc');

async function addTagsController(req, res, next) {
  const userTags = { ...req.body };
  const { authorization } = req.headers;

  try {
    await addTagsUC(userTags, authorization);
    return res.status(201).send();
  } catch (e) {
    return next(e);
  }
}

module.exports = addTagsController;
