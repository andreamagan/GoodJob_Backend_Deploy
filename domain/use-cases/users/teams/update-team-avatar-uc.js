'use strict';


const cloudinary = require('cloudinary');

const checkAuthorization = require('../../sessions/check-jwt-token-uc');
const acceptOnlyRole = require('../../sessions/accept-only-role-uc');
const teamRepository = require('../../../repositories/team-repository');

const cloudName = process.env.CLOUDINARI_CLOUD_NAME;
const apiKey = process.env.CLOUDINARI_API_KEY;
const apiSecret = process.env.CLOUDINARI_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function uploadAvatarUC(file, authorization) {
  const { uuid, role } = await checkAuthorization(authorization);
  await acceptOnlyRole(role, 'team');


  try {
    const { secure_url: avatarUrl } = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream({
        resource_type: 'raw',
        public_id: uuid,
        width: 200,
        height: 200,
        format: 'jpg',
        crop: 'limit',
      },
      async(err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }).end(file.buffer);
    });
    await teamRepository.updateAvatar(avatarUrl, uuid);
    console.log(avatarUrl);
    return avatarUrl;
  } catch (err) {
    throw new Error();
  }
}

module.exports = uploadAvatarUC;
