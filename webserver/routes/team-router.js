'use strict';

const express = require('express');
const multer = require('multer');

const getTeamProfile = require('../controllers/users/get-user-profile-c');
const updateTeamProfile = require('../controllers/users/teams/update-team-profile-c');
const uploadAvatar = require('../controllers/users/teams/update-team-avatar-c');

const upload = multer();
const router = express.Router();

router.get('/team', getTeamProfile);
router.put('/team', updateTeamProfile);
router.post('/team/avatar', upload.single('avatar'), uploadAvatar);

module.exports = router;
