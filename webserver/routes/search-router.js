'use strict';

const express = require('express');

const searchJobs = require('../controllers/jobs/search-jobs-c');
const searchPlayers = require('../controllers/users/players/search-players-c');
const searchTeams = require('../controllers/users/teams/search-teams-c');

const router = express.Router();

router.get('/search/jobs', searchJobs);
router.get('/search/players', searchPlayers);
router.get('/search/teams', searchTeams);

module.exports = router;
