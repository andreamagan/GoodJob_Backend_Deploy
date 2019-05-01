'use strict';

const uuidV4 = require('uuid/v4');

const JobModel = require('../../models/job-model');


/**
 * Create a new job
 *
 * @param {Object} teamProfile Team profile data 
 * @param {Object} jobInputData 
 * @returns {Object}
 */
async function postJob(teamProfile, jobInputData) {
  const now = new Date()
    .toISOString()
    .substring(0, 19)
    .replace('T', ' ');
  const { title, description, tags } = jobInputData;
  const { nickName } = teamProfile.profileInfo;
  const { teamUuid: uuid } = teamProfile;
  const uuid = uuidV4();
  console.log('_id', _id);

  const jobData = {
    team: _id,
    jobId: `${nickName}_${uuid}`,
    title,
    description,
    createdAt: now,
    deletedAt: null,
    tags,
    applicants: [],
  };

  console.log('jobData', jobData);

  const jobPosted = await JobModel.create(jobData);
  console.log('jobPosted', jobPosted);
  return jobPosted;
}


/**
 *Get uuid of job applicants
 *
 * @param {String} jobId
 * @returns {Array}
 */
async function getJobApplicantsUuids(jobId) {
  const filter = {
    jobId,
  };

  const projection = {
    applicants: 1,
    _id: 0,
  };

  const applicantsResult = await JobModel.findOne(filter, projection).lean(); // [{ ...user1 }, { ...user2 }, ...{user n}]
  console.log('applicants', applicantsResult);
  const applicantsUuids = applicantsResult.applicants;

  return applicantsUuids;
}

/**
 *
 *
 * @param {*} jobId
 * @returns
 */
async function getJobDetail(jobId) {
  const filter = {
    jobId,
  };

  const projection = {
    team: 1,
    jobId: 1,
    title: 1,
    description: 1,
    createdAt: 1,
    deletedAt: 1,
    tags: 1,
    applicants: 1,
    _id: 0,
  };

  const [jobInfo] = await JobModel.find(filter, projection).lean();
  return jobInfo;
}

async function deleteJob(jobId) {
  const now = new Date()
    .toISOString()
    .substring(0, 19)
    .replace('T', ' ');

  const update = {
    deletedAt: now,
  };
  console.log('3', jobId);

  await JobModel.findOneAndUpdate(jobId, update).lean();
  return null;
}

async function searchJobs(keyword) {
  const filter = {
    $text: {
      $search: keyword,
    },
  };

  const score = {
    score: {
      $meta: 'textScore',
    },
  };

  const jobs = await JobModel.find(filter, score).sort(score).lean();
  return jobs;
}

async function getNewJobs() {
  const filter = {
    deletedAt: null,
  };

  const newJobs = await JobModel.find(filter).sort({ $natural: -1 }).limit(10);
  return newJobs;
}


async function applyJob(jobId, uuid) {
  const filter = {
    jobId,
  };
  const update = {
    $addToSet: {
      applicants: uuid,
    },
  };
  await JobModel.findOneAndUpdate(filter, update);
}

module.exports = {
  postJob,
  getJobDetail,
  getJobApplicantsUuids,
  deleteJob,
  searchJobs,
  getNewJobs,
  applyJob,
};
