'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema({
  profileInfo: {
    fullName: {
      type: String,
      index: true,
    },
    nickName: {
      type: String,
      index: true,
    },
    description: {
      type: String,
      index: true,
    },
    social: {
      twitterUrl: String,
      twitchUrl: String,
      instagramUrl: String,
      webUrl: String,
    },
  },
  accountInfo: {
    email: String,
    password: String,
    createdAt: Date,
    activatedAt: Date,
    verificationCode: String,
    uuid: {
      type: String,
      unique: true,
    },
    role: String,
  },
  tags: [String],
  avatarUrl: String,

  players: [],
  jobs: [],
});

teamSchema.index(
  {
    'profileInfo.fullName': 'text',
    'profileInfo.nickName': 'text',
    tags: 'text',
  },
);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
