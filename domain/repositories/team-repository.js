'use strict';

const bcrypt = require('bcrypt');
const dot = require('dot-object');

const TeamModel = require('../../models/team-model');

const createNotFoundDataError = require('../use-cases/errors/not-found-error');

async function insertUserAccountInDB(userData) {
  const now = new Date().toISOString().substring(0, 19).replace('T', ' ');
  const {
    uuid, email, securePassword, verificationCode, role,
  } = userData;

  const teamProfileData = {
    profileInfo: {
      fullName: null,
      nickName: null,
      description: null,
      social: {
        twitterUrl: null,
        twichUrl: null,
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
    avatarUrl: null,

    players: [],
  };

  const userCreated = await TeamModel.create(teamProfileData);
  return userCreated;
}


async function checkIfUserAccountExist(email) {
  const filter = {
    'accountInfo.email': email,
  };

  const [result] = await TeamModel.find(filter);

  if (!result || [result] === undefined) {
    throw createNotFoundDataError();
  }
  return null;
}


async function checkIfActivatedAccount(email) {
  const filter = {
    'accountInfo.email': email,
    'accountInfo.activatedAt': { $ne: null },
  };

  const [result] = await TeamModel.find(filter);

  if (!result || [result] === undefined) {
    throw createNotFoundDataError();
  }
  return null;
}

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

  const activatedAccount = await TeamModel.findOneAndUpdate(filter, update);
  if (activatedAccount != null) {
    return true;
  }
  return false;
}

async function checkIfCorrectPassword(email, password) {
  const filter = {
    'accountInfo.email': email,
  };

  const projection = {
    'accountInfo.password': 1,
    _id: 0,
  };
  const [result] = await TeamModel.find(filter, projection);

  const { password: secretPassword } = result.accountInfo;
  const correctPassword = await bcrypt.compare(password, secretPassword);

  if (correctPassword === false) {
    throw new Error();
  }
  return null;
}


async function getUserAccountInfo(email) {
  const filter = {
    'accountInfo.email': email,
  };
  const projection = {
    accountInfo: 1,
  };
  const userAccountInfo = await TeamModel.find(filter, projection).lean();

  return userAccountInfo;
}

async function getProfile(uuid) {
  const filter = {
    'accountInfo.uuid': uuid,
  };

  const profile = await TeamModel.findOne(filter).lean();
  return profile;
}


/**
 * @param {String} uuid
 * @param {Object} userData data to be updated
 * @return {Object} null if everything is ok
 */
async function updateUserProfile(uuid, userData) {
  const userDataProfileMongoose = dot.dot(userData);
  const filter = {
    'accountInfo.uuid': uuid,
  };
  await TeamModel.updateOne(filter, userDataProfileMongoose);

  return null;
}


// const cloudName = process.env.CLOUDINARI_CLOUD_NAME;
// const apiKey = process.env.CLOUDINARI_API_KEY;
// const apiSecret = process.env.CLOUDINARI_API_SECRET;

// cloudinary.config({
//   cloud_name: cloudName,
//   api_key: apiKey,
//   api_secret: apiSecret,
// });

// async function updateAvatar(file, uuid) {
//   if (!file.buffer) {
//     throw new Error();
//   }

//   cloudinary.v2.uploader.upload_stream({
//     resource_type: 'raw',
//     public_id: uuid,
//     width: 200,
//     height: 200,
//     format: 'jpg',
//     crop: 'limit',
//   }, async(err, result) => {
//     if (err) {
//       throw err;
//     }

//     const {
//       secure_url: avatarUrl,
//     } = result;

//     const filter = {
//       'accountInfo.uuid': uuid,
//     };

//     await TeamModel.updateOne(filter, { avatarUrl });
//   }).end(file.buffer);
// }

async function postJob(uuid, jobId) {
  const filter = {
    'accountInfo.uuid': uuid,
  };

  const update = {
    $push: { jobs: jobId },
  };
  await TeamModel.findOneAndUpdate(filter, update);
  return null;
}

async function searchTeams(keyword) {
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

  const teams = await TeamModel.find(filter, score).sort(score).lean();
  return teams;
}

module.exports = {
  insertUserAccountInDB,
  checkIfUserAccountExist,
  checkIfActivatedAccount,
  activateAccount,
  checkIfCorrectPassword,
  getUserAccountInfo,
  getProfile,
  updateUserProfile,
  // updateAvatar,
  postJob,
  searchTeams,
};
