'use strict';

const express = require('express');
const multer = require('multer');

const getPlayerProfile = require('../controllers/users/get-user-profile-c');
const updatePlayerProfile = require('../controllers/users/players/update-player-profile-c');
const uploadAvatar = require('../controllers/users/players/update-player-avatar-c');
// const updateBackground = require();
const addTags = require('../controllers/users/players/add-tags-c');
const deleteTags = require('../controllers/users/players/delete-tags-c');

const upload = multer();
const router = express.Router();

router.get('/player', getPlayerProfile);
router.put('/player', updatePlayerProfile);
router.post('/player/avatar', upload.single('avatar'), uploadAvatar);
// router.patch('/player/background', updateBackground);
router.post('/player/tags', addTags);
router.delete('/player/tags', deleteTags);
// router.get('/player/jobs-status', getJobsStatus);

module.exports = router;
