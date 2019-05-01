'use strict';

const express = require('express');

const postJob = require('../controllers/jobs/post-job-c');

// //const updateJob = require();
const deleteJob = require('../controllers/jobs/delete-job-c');

const getJobApplicants = require('../controllers/jobs/get-job-applicants-c.js');
// // const rejectJobApplicants = require();

const getNewJobs = require('../controllers/jobs/get-new-jobs-c');
const getJobDetail = require('../controllers/jobs/get-job-detail-c');

const applyJob = require('../controllers/jobs/apply-job-c');

const router = express.Router();

router.post('/job', postJob);
// //router.put('/job', updateJob);
router.put('/job', deleteJob);
router.get('/job/applicants', getJobApplicants);
// // router.put('/job/applicants', rejectJobApplicants);

router.get('/jobs', getNewJobs);
router.get('/job', getJobDetail);

router.put('/job/apply', applyJob);


module.exports = router;
