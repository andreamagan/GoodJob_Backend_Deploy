'use strict';

const bcrypt = require('bcrypt');
const dot = require('dot-object');

const PlayerModel = require('../../models/player-model');

const createNotFoundDataError = require('../use-cases/errors/not-found-error');


/**
 * Save user account data into data base
 *
 * @param {object} userData - User registration data
 * @returns {object} userCreated - User account data after insert in data base
 */
async function insertUserAccountInDB(userData) {
  const now = new Date().toISOString().substring(0, 19).replace('T', ' ');
  const {
    uuid, email, securePassword, verificationCode, role,
  } = userData;

  const playerProfileData = {
    profileInfo: {
      fullName: '',
      nickName: '',
      description: '',
      social: {
        twitterUrl: null,
        twitchUrl: null,
        instagramUrl: null,
        webUrl: null,
      },
    },
    accountInfo: {
      email,
      password: securePassword,
      createdAt: now,
      activatedAt: null,
      verificationCode,
      uuid,
      role,
    },
    tags: [],
    jobs: [],
    avatarUrl: 'https://avatars.dicebear.com/v2/avataaars/44a11a4c6db67df7642a2172e27e3959.svg',
    team: null,

    background: {
      experience: [{
        company: null,
        job: null,
        dateStart: null,
        dateEnd: null,
      }],
      education: [{
        school: null,
        degree: null,
        dateStart: null,
        dateEnd: null,
      }],
    },
  };

  try {
    const userCreated = await PlayerModel.create(playerProfileData);
    return userCreated;
  } catch (e) {
    throw e;
  }
}


/**
 * Check if account already exist
 *
 * @param {string} email
 * @returns {Object} null if everything is ok
 */
async function checkIfUserAccountExist(email) {
  const filter = {
    'accountInfo.email': email,
  };

  const [result] = await PlayerModel.find(filter);

  if (!result || [result] === undefined) {
    throw createNotFoundDataError("Account doesn't exist");
  }
  return null;
}


/**
 * Check if the account has been verified & hasn't been activated yet
 *
 * @param {string} email
 * @returns {boolean} True if everything is ok
 */
async function checkIfActivatedAccount(email) {
  const filter = {
    'accountInfo.email': email,
    'accountInfo.activatedAt': { $ne: null },
  };

  const [result] = await PlayerModel.find(filter);

  if (!result || [result] === undefined) {
    throw createNotFoundDataError("Account doesn't activated yet");
  }
  return true;
}


/**
 * Sets the account activation date to now
 *
 * @param {string} verificationCode - Verification code sent by email
 * @param {string} email
 * @returns {Object} null if everything is ok
 */
async function activateAccount(verificationCode, email) {
  const now = new Date().toISOString().substring(0, 19).replace('T', ' ');
  const filter = {
    'accountInfo.email': email,
    'accountInfo.verificationCode': verificationCode,
    'accountInfo.activatedAt': null,
  };
  console.log(filter);
  const update = {
    $set: { 'accountInfo.activatedAt': now },
  };

  await PlayerModel.findOneAndUpdate(filter, update);
  return null;
}


/**
 * Checks if given password and saved password match
 *
 * @param {string} email
 * @param {string} password
 * @returns {object} null if everything is ok
 */
async function checkIfCorrectPassword(email, password) {
  const filter = {
    'accountInfo.email': email,
  };

  const projection = {
    'accountInfo.password': 1,
    _id: 0,
  };
  const [result] = await PlayerModel.find(filter, projection);

  const { password: secretPassword } = result.accountInfo;
  const correctPassword = await bcrypt.compare(password, secretPassword);

  if (correctPassword === false) {
    throw new Error('invalid password');
  }
  return null;
}


/**
 * Get profile data for a specific user using email
 *
 * @param {string} email
 * @returns {Object} userAccountInfo - Account information such as role, token, uuid, password...
 */
async function getUserAccountInfo(email) {
  const filter = {
    'accountInfo.email': email,
  };
  const projection = {
    accountInfo: 1,
  };

  const userAccountInfo = await PlayerModel.find(filter, projection).lean();
  return userAccountInfo;
}


/**
 * Get profile data for a specific user using uuid
 *
 * @param {string} uuid - Unique user identifier
 * @returns {object} profile - Complete profile data
 */
async function getProfile(uuid) {
  const filter = {
    'accountInfo.uuid': uuid,
  };
  const projection = {
    _id: 0,
    __v: 0,
  };

  const profile = await PlayerModel.findOne(filter, projection).lean();
  return profile;
}


/**
 * Get all applicant profiles for a job offer
 *
 * @param {Array} applicantsUuids - Unique user identifiers
 * @returns {Array} applicantProfiles - Basic profile data for all applicants
 */
async function getApplicantProfile(applicantsUuids) {
  console.log('2', applicantsUuids);
  const filterApplicantsData = {
    'accountInfo.uuid': {
      $in: applicantsUuids,
    },
  };

  const projectionApplicantsData = {
    'accountInfo.uuid': 1,
    avatarUrl: 1,
    'profileInfo.fullName': 1,
    'profileInfo.nickName': 1,
    tags: 1,
    _id: 0,
  };

  const applicantProfiles = await PlayerModel.find(filterApplicantsData, projectionApplicantsData).lean();
  console.log('3', applicantProfiles);
  return applicantProfiles;
}


/**
 * Update player profile
 *
 * @param {String} uuid - Unique user identifier
 * @param {Object} userData data to be updated
 * @return {Object} null if everything is ok
 */
async function updateProfile(uuid, userData) {
  const userDataProfileMongoose = dot.dot(userData);
  const filter = {
    'accountInfo.uuid': uuid,
  };
  await PlayerModel.updateOne(filter, userDataProfileMongoose);
  return null;
}


/**
 * Save or update user avatar url into data base
 *
 * @param {String} avatarUrl - url where the avatar is located
 * @param {string} uuid - Unique user identifier
 * @returns {Object} null if everything is ok
 */
function updateAvatar(avatarUrl, uuid) {
  const filter = {
    'accountInfo.uuid': uuid,
  };

  const update = {
    $set: {
      avatarUrl,
    },
  };

  PlayerModel.updateOne(filter, update);
  return null;
}


/**
 * Add tags
 *
 * @param {Array} userTags - Tags selected by user
 * @param {string} uuid - Unique user identifier
 * @returns {Object} null if everything is ok
 */
async function addTags(userTags, uuid) {
  const tags = Object.values(userTags);
  const filter = {
    'accountInfo.uuid': uuid,
  };
  const update = {
    $set: { tags },
  };
  await PlayerModel.findOneAndUpdate(filter, update);
  return null;
}


/**
 * Delete tags
 *
 * @param {Array} userTags - Tags selected by user
 * @param {string} uuid - Unique user identifier
 * @returns {Object} null if everything is ok
 */
async function deleteTags(userTags, uuid) {
  const tags = Object.values(userTags);

  const filter = {
    'accountInfo.uuid': uuid,
  };

  const update = {
    $pull: {
      tags: { $in: tags },
    },
  };

  await PlayerModel.findOneAndUpdate(filter, update);
  return null;
}


/**
 * Search player profiles by search term
 *
 * @param {string} keyword - search term
 * @returns {array} players - profile results sorted by score
 */
async function searchPlayers(keyword) {
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

  const players = await PlayerModel.find(filter, score).sort(score).lean();
  return players;
}

module.exports = {
  insertUserAccountInDB,
  checkIfActivatedAccount,
  activateAccount,
  checkIfUserAccountExist,
  checkIfCorrectPassword,
  getUserAccountInfo,
  getProfile,
  getApplicantProfile,
  updateProfile,
  updateAvatar,
  addTags,
  deleteTags,
  searchPlayers,

};
